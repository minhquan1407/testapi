import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { postCreateTutorial } from "../api/TutorialAxios";
import { toast } from "react-toastify";

AddTutorial.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleAddNewTutorial: PropTypes.func,
};

function AddTutorial({ show, handleClose, handleAddNewTutorial }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState("");
  const handleSaveTutorial = async () => {
    let data = await postCreateTutorial(title, description, published);
    console.log("check ressss: ", data);
    if (data && data.id) {
      handleClose();
      setTitle("");
      setDescription("");
      setPublished("");
      toast.success("A User is created succeed");
      handleAddNewTutorial({
        title: title,
        description: description,
        published: published,
        id: data.id,
      });
      //   success
    } else {
      toast.error("A error...");
      //error
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-lable">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Published</label>
              <input
                type="text"
                className="form-control"
                value={published}
                onChange={(event) => setPublished(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveTutorial()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTutorial;
