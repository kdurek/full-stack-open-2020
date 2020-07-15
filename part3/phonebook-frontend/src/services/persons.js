import axios from "axios";
const baseUrl =
  process.env.REACT_APP_BASE_URL || "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject);
};

const update = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
