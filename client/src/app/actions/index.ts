import { Saga }    from "redux-saga";
import { Reducer } from "redux";

export const RUN = "SAGAS/RUN";

export const ADD_REDUCER = "REDUCERS/ADD";
export const REMOVE_REDUCER = "REDUCERS/REMOVE";
export const REPLACE_REDUCER = "REDUCERS/REPLACE";

interface IRunActionMeta {
  saga: Saga;
  params?: Object;
}

export interface IRunAction {
  type: string;
  meta: IRunActionMeta;
}

export const run = (meta: IRunActionMeta): IRunAction => ({
  type: RUN,
  meta
});

export const addReducer = (key: string, reducer: Reducer) => ({
  type: ADD_REDUCER,
  meta: { key, reducer }
});
export const removeReducer = (key: string) => ({
  type: REMOVE_REDUCER,
  meta: key
});
export const replaceReducer = (key: string, reducer: Reducer) => ({
  type: REPLACE_REDUCER,
  meta: { key, reducer }
});
