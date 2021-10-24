//TODO: ПРоблемный файл. Не решена проблема использования combineReducer

import { fromJS, Map }         from "immutable";

import { ADD, CLEAR, LOADING }                          from "../actions";

const initialState = Map({
  data: null,
  loading: false
});

export function dogsListPage(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return state.set("data", fromJS(action.payload.data));
    case LOADING:
      return state.set("loading", action.payload.isLoading);
    case CLEAR:
      return state.set("data", null);
  }

  const data = state.get("data");
  if (!data)
    return state;

  switch (action.type) {
    // case CLEAR_THEMES:
    // case TOGGLE_THEMES: {
    //   const formState = state.getIn(["data", "themesFilter"]);
    //   return state.setIn(["data", "themesFilter"], themesFilter(formState, action));
    // }

    default:
      return state;
  }
}

export default {};
