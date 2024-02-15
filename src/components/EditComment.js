import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditComment = (props) => {
  const { task, comment, dataFromCommentUpdate } = props;
  const [msg, setMsg] = useState(comment?.post);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateComment = () => {
    comment.post = msg;
    dataFromCommentUpdate(task);
    handleClose();
  };
  return (
    <>
      <Button className="pill-button primary update-pill" onClick={handleShow}>
        <i className="fa fa-edit"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Form>
            <FloatingLabel controlId="floatingTextarea2" label="Update Comment">
              <Form.Control
                as="textarea"
                placeholder="add a comment and press enter"
                style={{ height: "100px" }}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                value={msg}
              />
            </FloatingLabel>
          </Form>
          {/* Button Section */}
          <button
            type="button"
            className="button primary update"
            onClick={(e) => {
              updateComment();
            }}
          >
            {" "}
            Save
          </button>
          <button
            type="button"
            className="button danger"
            onClick={(e) => {
              handleClose();
            }}
          >
            {" "}
            Cancel
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditComment;
