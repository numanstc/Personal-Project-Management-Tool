import axios from "axios";
import { GET_ERRORS, GET_BACKLOG } from "./types";

export const addProjectTask = (
  backlog_id,
  project_task,
  history
) => async dispatch => {
  await axios
    .post(`/api/backlog/${backlog_id}`, project_task)
    .then(res => {
      history.push(`/projectBoard/${backlog_id}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getBacklog = backlog_id => async dispatch => {
  await axios.get(`/api/backlog/${backlog_id}`).then(res => {
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  });
};
