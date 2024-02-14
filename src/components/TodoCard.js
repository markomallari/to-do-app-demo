import React from "react";
import Card from "react-bootstrap/Card";
import Comments from "./Comments";
import CommentLists from "./CommentLists";
import EditTodo from "./EditTodo";

const TodoCard = (props) => {
  const {
    task,
    dataFromUpdate,
    dataFromDelete,
    dataFromCommentAdd,
    dataFromCommentDelete,
    dataFromCommentUpdate,
  } = props;

  const deleteTask = (id) => {
    dataFromDelete(id);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{task?.name}</Card.Title>
        <Card.Text>{task?.description}</Card.Text>
        {/* Button Section */}
        <EditTodo task={task} dataFromUpdate={dataFromUpdate} />
        <button
          type="button"
          className="button danger"
          onClick={(e) => {
            deleteTask(task?.id);
          }}
        >
          {" "}
          <i className="fa fa-trash"></i> Remove Task
        </button>
        {/* Comment Section */}
        <h6>Comments:</h6>
        <CommentLists
          dataFromCommentUpdate={dataFromCommentUpdate}
          commentlist={task?.comments}
          task={task}
          /* dataFromCommentEdit={dataFromCommentEdit} */
          dataFromCommentDelete={dataFromCommentDelete}
        />
        <Comments
          dataFromCommentAdd={dataFromCommentAdd}
          task={task}
          currentCount={Math.max(...task?.comments.map((o) => o.comment_id))}
        />
      </Card.Body>
    </Card>
  );
};

export default TodoCard;
