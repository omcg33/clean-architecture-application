import {
  // take,
  takeEvery,
  fork,
} from "redux-saga/effects";

import {
  RUN
}                    from "../actions";

export default function* rootSaga() {
  yield takeEvery(RUN, function* ({ payload }: any) {
    yield fork(payload);
    // yield take(STOP);
    // console.log('stopped');
    // saga.cancel();
  });

}
