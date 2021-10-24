import { Map, fromJS } from "immutable";

import { SET }         from "../actions";

const initialState = Map({});


export function meta(state = initialState, action: { type: string, payload: any }) {
  switch (action.type) {
    case SET: {
      return fromJS(action.payload);
    }

    default:
      return state;
  }
}


export default {};
