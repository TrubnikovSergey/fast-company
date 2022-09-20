import React, { useEffect, useState } from "react";
import CommentsList from "./commentsList";
import CreateComment from "./createComment";
import API from "../../../../api";
import { useParams } from "react-router-dom";

const CommentPanel = () => {
    const [commentsList, setCommentsList] = useState();
    const { userId } = useParams();

    useEffect(() => {
        API.comments.fetchCommentsForUser(userId).then((data) => {
            const newData = data.map(async (comment) => {
                const user = await API.users.getById(comment.userId);
                return { ...comment, userName: user.name };
            });

            Promise.all(newData).then((data) => {
                setCommentsList(data.sort(compare));
            });
        });
    }, []);

    function compare(a, b) {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at === b.created_at) return 0;
        if (a.created_at < b.created_at) return 1;
    }

    const handleCreate = async (comment) => {
        const addComment = await API.comments.add(comment);

        setCommentsList((prev) =>
            [...prev, { ...addComment, userName: comment.userName }].sort(
                compare
            )
        );
    };

    const handleDelete = (id) => {
        API.comments.remove(id);
        setCommentsList(
            commentsList.filter((comment) => comment._id !== id).sort(compare)
        );
    };

    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <div className="card-body">
                    <CreateComment onCreate={handleCreate} />
                </div>
            </div>
            {commentsList ? (
                commentsList.length > 0 && (
                    <div className="card mb-3">
                        <div className="card-body">
                            <h2>Comments</h2>
                            <hr />
                            <CommentsList
                                commentsList={commentsList}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                )
            ) : (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Loading...</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentPanel;
