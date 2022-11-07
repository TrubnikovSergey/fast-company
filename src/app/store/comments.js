import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createComment: (state, action) => {
            state.entities.push(action.payload);
        },
        removeComment: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    createComment,
    removeComment
} = actions;

const requestAddComment = createAction("comments/requestAddComment");
const requestAddCommentFailed = createAction(
    "comments/requestAddCommentFailed"
);
const requestDelComment = createAction("comments/requestDelComment");
const requestDelCommentFailed = createAction(
    "comments/requestDelCommentFailed"
);

export const addComment = (comment) => async (dispatch) => {
    dispatch(requestAddComment());
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(createComment(content));
    } catch (error) {
        dispatch(requestAddCommentFailed(error.message));
    }
};

export const deleteComment = (id) => async (dispatch) => {
    dispatch(requestDelComment());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(removeComment(id));
        }
    } catch (error) {
        dispatch(requestDelCommentFailed(error.message));
    }
};

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
