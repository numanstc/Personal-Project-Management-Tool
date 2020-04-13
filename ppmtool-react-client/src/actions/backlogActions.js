import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK } from "./types";

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
  await axios
    .get(`/api/backlog/${backlog_id}`)
    .then(res => {
      dispatch({
        type: GET_BACKLOG,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getProjectTask = (
  backlog_id,
  ptask_id,
  history
) => async dispatch => {
  await axios
    .get(`/api/backlog/${backlog_id}/${ptask_id}`)
    .then(res => {
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data
      });
    })
    .catch(err => {
      history.push(`/projectBoard/${backlog_id}`);
    });
};

export const updateProjectTask = (
  backlog_id,
  ptask_id,
  project_task,
  history
) => async dispatch => {
  await axios
    .patch(`/api/backlog/${backlog_id}/${ptask_id}`, project_task)
    .then(res => {
      history.push(`/projectBoard/${backlog_id}`);
      // Alt taraf hataları temizliyor şu anki ihtiyaç yok
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: {}
      // });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
