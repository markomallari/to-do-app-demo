import React from "react";
import { Badge, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import EditComment from "./EditComment";

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
              <div className="fw-bold">"{comment?.post}"</div>-{comment?.by}
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
