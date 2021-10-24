import { Task }                                     from "redux-saga";
import { call, put, select, take, takeEvery } from "redux-saga/effects";

import { get }                            from "../../../libs/xhr";
import history                            from "../../../app/history";
import { API_ROUTES_GET, generateApiUrl } from "../../../../../interfaces/controllers/helpers/routes";

import { set }                    from "../../../modules/meta/actions";
import { add, clear, error, LOAD, loaded, loading, UNMOUNT } from "../actions";

import { getData } from "../selectors";

export default function* () {
  let listeners: Task[] = [];
  listeners.push(yield takeEvery(LOAD, getPageData));

  yield take(UNMOUNT);
  yield put(clear());
  listeners.forEach(l => l.cancel());
}

export function* getPageData({ payload }: any) {
  const data = yield select(getData);

  if (!data) {
    try {
      yield put(loading(true));

      const { meta, ...data } = yield call(get, generateApiUrl(API_ROUTES_GET.PAGE_NOT_FOUND), payload);

      yield put(set(meta));
      yield put(add(data));
    } catch (e) {
      if (e.response.status === 404) {
        yield call(() => {
            const location = history.location;
            history.replace(location.pathname, {
              ...location.state,
              is404: true
            });
          }
        );
        return;
      }
      console.error(e);
      yield put(error(e.message));
    } finally {
      yield put(loading(false));
    }

  }
  yield put(loaded());
}
