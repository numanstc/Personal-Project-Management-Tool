import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from "./types";

// Burası api isteklerinin yapıldığı yer

export const createProject = (project, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/api/project", project);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
// error nesneleri buraya gelecek

export const getProjects = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};

//eğer hata alırsak geri dönmek için history var
export const getProject = (id, history) => async dispatch => {
  // const res = axios.get("http://localhost:8080/api/project/" + id);
  // const res = axios.get(`http://localhost:8080/api/project/${id}`);
  axios.get(`http://localhost:8080/api/project/${id}`).then(res => {
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  });
};
