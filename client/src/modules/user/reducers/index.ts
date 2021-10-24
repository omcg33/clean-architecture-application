import {fromJS} from "immutable";

import {LOGIN, LOGOUT} from "../actions";

export function user(state = null, action: any) {
  switch (action.type) {
    case LOGIN: return fromJS({
      isAuthorized: true,
      username: action.payload.username,
      email: action.payload.email
    });
    case LOGOUT: return fromJS({
      isAuthorized: false,
      username: undefined,
      email: undefined
    });
    default: return state;
  }
}


export default {};
