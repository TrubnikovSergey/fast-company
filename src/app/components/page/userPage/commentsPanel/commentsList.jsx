import React from "react";
import PropTypes from "prop-types";
import { getAgeComment } from "../../../../utils/getAgeComment";

const CommentsList = ({ commentsList, onDelete }) => {
    return (
        <>
            {commentsList
                ? commentsList.map((comment) => (
                      <div
                          className="bg-light card-body mb-3"
                          key={comment._id}
                      >
                          <div className="row">
                              <div className="col">
                                  <div className="d-flex flex-start">
                                      <img
                                          src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
                                          className="rounded-circle shadow-1-strong me-3"
                                          alt="avatar"
                                          width="65"
                                          height="65"
                                      />
                                      <div className="flex-grow-1 flex-shrink-1">
                                          <div className="mb-4">
                                              <div className="d-flex justify-content-between align-items-center">
                                                  <p className="mb-1">
                                                      {`${comment.userName} `}
                                                      <span className="small">
                                                          {getAgeComment(
                                                              comment.created_at
                                                          )}
                                                      </span>
                                                  </p>
                                                  <button
                                                      className="btn btn-sm text-primary d-flex align-items-center"
                                                      onClick={() =>
                                                          onDelete(comment._id)
                                                      }
                                                  >
                                                      <i className="bi bi-x-lg"></i>
                                                  </button>
                                              </div>
                                              <p className="small mb-0">
                                                  {comment.content}
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
                : "Loading..."}
        </>
    );
};

CommentsList.propTypes = {
    commentsList: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentsList;
