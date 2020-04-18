import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJsonWebToken from "../securityUtils/setJsonWebToken";
import jwt_decode from "jwt-decode";

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

export const login = LoginRequest => async dispatct => {
  // post => Login request
  await axios
    .post("/api/users/login", LoginRequest)
    .then(res => {
      // extract token from res.token
      const { token } = res.data;
      // store the token in the local store
      localStorage.setItem("jwtToken", token);
      // set our token in the header
      setJsonWebToken(token);
      // decode token on React
      const decoded = jwt_decode(token);
      // dispatch to our securityReducer

      dispatct({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    })
    .catch(err => {
      dispatct({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
