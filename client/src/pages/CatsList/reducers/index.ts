import { fromJS, Map }     from "immutable";
import { combineReducers } from "redux-immutable";

import { stubMap } from "../../../app/reducers";

import { ADD }      from "../actions";

const initialState = Map();

export function defaultReducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return fromJS(action.payload);
    default:
      return state;
  }
}

export const pageReducer = combineReducers({
  seoData: stubMap,
  course: stubMap
});
