import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const AddTodo = (props) => {
  const { dataFromAdd, currentCount } = props;
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addTask = () => {
    const transformedData = {
      id: parseInt(currentCount) + 1,
      name: name,
      description: description,
      comments: [],
    };
    dataFromAdd(transformedData);
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
        <i className="fa fa-plus"></i> Add Task
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
              />
            </Form.Group>
          </Form>
          {/* Button Section */}
          <button
            type="button"
            className="button primary update"
            onClick={(e) => {
              addTask();
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

export default AddTodo;
