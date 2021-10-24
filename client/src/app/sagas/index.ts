import {
  // take,
  takeEvery,
  fork,
  call, select
} from "redux-saga/effects";

import { getCookie } from "@tutu/cookie";
import SendLogs      from "@tutu/sendlogs";

import { API_ROUTES_GET, generateApiUrl } from "../../../../interfaces/controllers/helpers/routes";

import { get, post }    from "../../libs/xhr";
import sendLogs         from "../../libs/sendLogs";
// import { imageResizer } from "../../libs/imageResizer";

import { userwayListener } from "./userway";

import {
  RUN
}                    from "../actions";
import {
  LOGIN, LOGOUT
}                    from "../../modules/user/actions";
import { getConfig } from "../../modules/config/selectors";

import { PAGEID, REFERENCE_TOKEN, SESSIONID } from "../../../const";


export default function* rootSaga() {
  yield updateSendLogs();
  // yield updateImageResizer();

  yield takeEvery(RUN, function* ({ payload }: any) {
    yield fork(payload);
    // yield take(STOP);
    // console.log('stopped');
    // saga.cancel();
  });

  yield takeEvery(LOGIN, function* () {
    yield call(post, "/auth/login");
    yield updateSendLogs();
  });

  yield takeEvery(LOGOUT, function* () {
    yield call(get, generateApiUrl(API_ROUTES_GET.AUTH_LOGOUT));
    yield updateSendLogs();
  });

  yield fork(userwayListener);
}

function* updateSendLogs() {
  const state = yield select();
  const url = getConfig(state, ["apiHosts", "userway"]);

  sendLogs.instance = new SendLogs({
    url,
    serverRendering: false,
    reference_token: getCookie(REFERENCE_TOKEN),
    globalLogData: {
      page_id: getCookie(PAGEID) || "",
      session_id: getCookie(SESSIONID) || ""
    }
  });
}
//TODO: Если нужен resize картинок из filestorage
//
// function* updateImageResizer() {
//   const state = yield select();
//   createImageResizer(state);
// }
//
// export function createImageResizer(state) {
//   const url = getConfig(state, ["apiHosts", "imageProxy"]);
//
//   imageResizer(url);
// }
