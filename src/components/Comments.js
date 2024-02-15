import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { getUserStore } from "../utils/storage";

const Comments = (props) => {
  const { task, currentCount, dataFromCommentAdd } = props;
  const [msg, setMsg] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const user = JSON.parse(getUserStore());
      const transformedData = {
        comment_id: parseInt(currentCount) + 1,
        post: e.target.value,
        by: user[0]?.name,
      };
      task?.comments?.push(transformedData);
      dataFromCommentAdd(task);
      setMsg("");
    }
  };
  return (
    <>
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          value={msg}
        />
      </FloatingLabel>
    </>
  );
};

export default Comments;
