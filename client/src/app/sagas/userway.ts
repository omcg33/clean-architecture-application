import { takeEvery } from "redux-saga/effects";

import sendLogs       from "../../libs/sendLogs";

import { USERWAY }    from "../actions/userway";


function* userwayListener() {
  yield takeEvery(USERWAY.SEND, function ({payload}: any) {
    if (!payload) {
      return;
    }

    sendLogs.send(payload);
  });
}

export { userwayListener };
export default {};
