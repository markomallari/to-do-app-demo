import React from "react";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import EditComment from "./EditComment";
import Moment from "react-moment";

const CommentLists = (props) => {
  const { task, commentlist, dataFromCommentDelete, dataFromCommentUpdate } =
    props;
  const deleteComment = (id) => {
    task.comments = task?.comments.filter((val) => val?.comment_id !== id);
    dataFromCommentDelete(task);
  };

  return (
    <ListGroup variant="flush">
      {commentlist.length ? (
        commentlist?.map((comment, i) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={i}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">"{comment?.post}"</div>
              <div className="name-pane">-{comment?.by}</div>
              <div className="date-pane">
                <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">
                  {comment?.dateTime}
                </Moment>
              </div>
            </div>

            <EditComment
              comment={comment}
              task={task}
              dataFromCommentUpdate={dataFromCommentUpdate}
            />
            <Button
              className="pill-button danger"
              onClick={() => {
                deleteComment(comment?.comment_id);
              }}
            >
              <i className="fa fa-close"></i>
            </Button>
          </ListGroup.Item>
        ))
      ) : (
        <>No Comments found</>
      )}
    </ListGroup>
  );
};

export default CommentLists;
