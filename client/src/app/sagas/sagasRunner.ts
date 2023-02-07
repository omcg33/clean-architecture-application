import { Saga } from "redux-saga";
import {
  fork, takeEvery, call
}               from "redux-saga/effects";

// // import i18n                      from 'modules/i18n/sagas';
import logger        from "../../modules/logger/sagas";

import { ADD_REDUCER, IRunAction, REMOVE_REDUCER, REPLACE_REDUCER, RUN } from "../actions";


const NOT_SEND_ERRORS = [
  "API_PARSING_ERROR",
  "API_UNAUTHORIZED",
  "API_TRANPORT_ERROR",
  "API_REQUEST_ERROR",
  "API_INTERNAL_ERROR"
];


/**
 *
 */
export function* initialSagas(reducerManager) {
  // yield fork(i18n);
  yield fork(logger);

  yield takeEvery(RUN, function* ({ meta }: IRunAction) {
    yield fork(meta.saga, meta.params);
  });

  yield takeEvery(ADD_REDUCER, function* ({ meta }: any) {
    const { key, reducer } = meta;
    yield call(reducerManager.add, key, reducer);
  });

  yield takeEvery(REMOVE_REDUCER, function* ({ meta }: any) {
    yield call(reducerManager.remove, meta);
  });
 
  yield takeEvery(REPLACE_REDUCER, function* ({ meta }: any) {
    const { key, reducer } = meta;
    yield call(reducerManager.replace, key, reducer);
  });
}


/**
 * Default saga runner.
 *
 * @param reducerManager
 * @param sagaToRun
 */
export default function* rootSaga(reducerManager: any, sagaToRun: Saga<any>) {

  try {
    yield fork(initialSagas, reducerManager);
    yield sagaToRun();
  } catch (e) {
    const { name, 
      // stack, message 
    } = e as any;

    if (process.env.NODE_ENV === "production") { // eslint-disable-line
      // Don't send already sent errors from server
      if (!~NOT_SEND_ERRORS.indexOf(name)) {
       // отошли ошибку
      }
    } else {
      console.error(e);  // eslint-disable-line
    }

    // window.Raven?.captureException(e);
  }
}

