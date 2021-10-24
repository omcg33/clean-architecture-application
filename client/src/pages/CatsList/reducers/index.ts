import { fromJS, Map }     from "immutable";
import { combineReducers } from "redux-immutable";

import { stubList }      from "../../../app/reducers";
import { ImmutableMap } from "../../../interfaces";

import { ADD }      from "../actions";

interface IState {
  cats: any;
};

const initialState: ImmutableMap<IState> = Map({
  cats: []
});

export function defaultReducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return fromJS(action.payload);
    default:
      return state;
  }
}

export const pageReducer = combineReducers<IState>({
  cats: stubList,
});
