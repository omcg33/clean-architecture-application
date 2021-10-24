import axios    from "axios";
import { Saga } from "redux-saga";
import {
  fork, put, takeEvery, select, call
}               from "redux-saga/effects";

// // import i18n                      from 'modules/i18n/sagas';
import logger        from "../../modules/logger/sagas";
import { sendLog }   from "../../modules/logger/actions";
import { getConfig } from "../../modules/config/selectors";
import SystemLogger  from "../../utils/systemLogger";

import { ADD_REDUCER, IRunAction, REMOVE_REDUCER, REPLACE_REDUCER, RUN } from "../actions";


const sysLogger = new SystemLogger("root");
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
  const config = yield select(getConfig);

  axios.defaults = {
    ...axios.defaults,
    withCredentials: true,
    maxContentLength: (config.get("maxContentLength") * 1024) * 1024,
    timeout: config.get("apiRequestTimeout"),
  };

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


export function* sysLoggerSaga() {
  yield takeEvery("*", function(action) {
    sysLogger.addAction(action);
  });
}


/**
 * Default saga runner.
 *
 * @param reducerManager
 * @param sagaToRun
 */
export default function* rootSaga(reducerManager: any, sagaToRun: Saga<any>) {
  yield fork(sysLoggerSaga);

  try {
    sysLogger.addLog("saga load");
    yield fork(initialSagas, reducerManager);
    yield sagaToRun();
  } catch (e) {
    const { name, stack, message } = e as any;

    if (process.env.NODE_ENV === "production") { // eslint-disable-line
      // Don't send already sent errors from server
      if (!~NOT_SEND_ERRORS.indexOf(name)) {
        yield put(sendLog("SAGA_ERROR", {
          name,
          stack,
          message,
          ...sysLogger.getLogs()
        }, message));
      }
    } else {
      console.error(e);  // eslint-disable-line
    }

    // window.Raven?.captureException(e);
  }
}

