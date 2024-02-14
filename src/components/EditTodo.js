import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const EditTodo = (props) => {
  const { task, dataFromUpdate } = props;
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
    }
  }, []);

  const updateTask = () => {
    const transformedData = {
      id: task?.id,
      name: name,
      description: description,
      comments: task?.comments,
    };
    dataFromUpdate(transformedData);
    handleClose();
  };

  return (
    <>
      <button
        type="button"
        className="button primary update"
        onClick={handleShow}
      >
        {" "}
        <i className="fa fa-edit"></i> Edit Task
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </Form.Group>
          </Form>
          {/* Button Section */}
          <button
            type="button"
            className="button primary update"
            onClick={(e) => {
              updateTask();
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

export default EditTodo;
