import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { updateTutorial } from "../api/TutorialAxios";
import { toast } from "react-toastify";

EditTutorial.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleUpdateTutorialFromModal: PropTypes.func,
  dataUpdateTutorial: PropTypes.object,
};

function EditTutorial({
  show,
  handleClose,
  handleUpdateTutorialFromModal,
  dataEditTutorial,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState("");
  const handleUpdateTutorial = async () => {
    let data = await updateTutorial(
      dataEditTutorial.id,
      title,
      description
      // published
    );
    console.log("check ress: ", data);
    if (data) {
      handleClose();
      toast.success("Update user success");
      handleUpdateTutorialFromModal({
        title: title,
        description: description,
        id: dataEditTutorial.id,
        // published: published,
      });
      //   success
    } else {
      toast.error("A error...");
      //error
    }
  };
  useEffect(() => {
    // hàm này chạy khi có sự thay đổi của dataUserEdit
    if (show) {
      setTitle(dataEditTutorial.title);
      setDescription(dataEditTutorial.description);
      // setPublished(dataUpdateTutorial.published);
    }
  }, [dataEditTutorial]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Tutorial</Modal.Title>
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
          <Button variant="primary" onClick={() => handleUpdateTutorial()}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTutorial;
