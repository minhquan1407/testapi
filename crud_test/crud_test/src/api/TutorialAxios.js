import axios from "./axiosClient";

const fetchAllTutorial = () => {
  return axios.get("/api/tutorials");
};
const postCreateTutorial = (title, description, published) => {
  return axios.post("/api/tutorials", { title, description, published });
};
const updateTutorial = (id, title, description, published) => {
  return axios.put(`api/tutorials/${id}`, { title, description, published });
};
const deleteTutorial = (id) => {
  return axios.delete(`api/tutorials/${id}`);
};
export { postCreateTutorial, fetchAllTutorial, updateTutorial, deleteTutorial };
