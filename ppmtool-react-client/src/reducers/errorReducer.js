import { GET_ERRORS } from "../actions/types";

const inintialState = {};

export default function(state = inintialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
