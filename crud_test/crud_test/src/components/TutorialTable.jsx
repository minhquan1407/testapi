import _ from "lodash";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchAllTutorial } from "../api/TutorialAxios";
import AddTutorial from "../screens/AddTutorial";
import DeleteTutorial from "../screens/DeleteTutorial";
import EditTutorial from "../screens/EditTutorial";
import "./TutorialTable.scss";

function TutorialTable() {
  const [tutorialList, setTutorialList] = useState([]);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [dataEditTutorial, setDataEditTutorial] = useState({});
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const [dataDeleteTutorial, setDataDeleteTutorial] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  useEffect(() => {
    getTutorialsData();
  }, []);
  const getTutorialsData = async () => {
    let data = await fetchAllTutorial();
    if (data) {
      console.log("check res: ", data);
      setTutorialList(data);
    }
  };

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };
  const handleAddNewTutorial = (tutorials) => {
    setTutorialList([...tutorialList, tutorials]);
    // console.log("check tutorial:", tutorials);
  };
  const handleUpdateTutorial = (tutorials) => {
    setIsShowModalEdit(true);
    setDataEditTutorial(tutorials);
    console.log("check tutt:", tutorials);
  };
  const handleUpdateTutorialFromModal = (tutorials) => {
    let cloneListTutorial = _.cloneDeep(tutorialList);
    let index = tutorialList.findIndex((item) => item.id === tutorials.id);
    cloneListTutorial[index].title = tutorials.title;
    cloneListTutorial[index].description = tutorials.description;
    setTutorialList(cloneListTutorial);
    console.log(tutorialList, cloneListTutorial);
  };
  const handleDeleteUser = (tutorials) => {
    setIsShowModalDelete(true);
    setDataDeleteTutorial(tutorials);
  };
  const handleDeleteUserFromModal = (tutorials) => {
    let cloneListTutorial = _.cloneDeep(tutorialList);
    cloneListTutorial = cloneListTutorial.filter(
      (item) => item.id !== tutorials.id
    );
    setTutorialList(cloneListTutorial);
  };
  return (
    <>
      <div className="my-3 add-new d-sm-flex">
        <span>
          <b>List Tutorials: </b>
          <div className="group-btns mt-sm-0 mt-2"></div>
        </span>
        <div className="group-btns">
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add new
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 my-3">
        <input
          className="form-control"
          placeholder="Search user by email..."
          // value={keyword}
        />
      </div>
      <div className="customize-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Published</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tutorialList &&
              tutorialList.length > 0 &&
              tutorialList.map((tutorial, index) => {
                return (
                  <tr key={`tutorial-${index}`}>
                    <td>{tutorial.id}</td>
                    <td>{tutorial.title}</td>
                    <td>{tutorial.description}</td>
                    <td>{tutorial.published}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => handleUpdateTutorial(tutorial)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(tutorial)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <AddTutorial
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleAddNewTutorial={handleAddNewTutorial}
      />
      <EditTutorial
        show={isShowModalEdit}
        handleClose={handleClose}
        dataEditTutorial={dataEditTutorial}
        handleUpdateTutorialFromModal={handleUpdateTutorialFromModal}
      />
      <DeleteTutorial
        show={isShowModalDelete}
        handleClose={handleClose}
        dataDeleteTutorial={dataDeleteTutorial}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
}

export default TutorialTable;
