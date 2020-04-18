import axios from "axios";
import { GET_ERRORS } from "./types";

export const createNewUser = (newUser, history) => async dispatct => {
  await axios
    .post("/api/users/register", newUser)
    .then(res => {
      history.push("/login");
      dispatct({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatct({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
