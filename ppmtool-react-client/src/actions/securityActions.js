import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJsonWebToken from "../securityUtils/setJsonWebToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
	await axios
		.post("/api/users/register", newUser)
		.then((res) => {
			history.push("/login");
			dispatch({
				type: GET_ERRORS,
				payload: {},
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const login = (LoginRequest) => async (dispatch) => {
	// post => Login request
	await axios
		.post("/api/users/login", LoginRequest)
		.then((res) => {
			// extract token from res.data
			const { token } = res.data;
			// store the token in the localStorage
			localStorage.setItem("jwtToken", token);
			// set our token in header ***
			setJsonWebToken(token);
			// decode token on React
			const decoded = jwt_decode(token);
			// dispatch to our securityReducer
			dispatch({
				type: SET_CURRENT_USER,
				payload: decoded,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};
