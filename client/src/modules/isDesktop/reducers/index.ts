import { SET } from "../actions";

const initialState = false;

export function isDesktop(state = initialState, action: any) {
  switch (action.type) {
    case (SET): return action.payload;
    default: return state;
  }
}
