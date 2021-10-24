import { Task }                    from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";

import { PAGES_KEYS } from "../../../../../const";

import { get } from "../../../libs/xhr";


import { addReducer, removeReducer } from "../../../app/actions";
import { generateApiUrl }            from "../../../app/routes";
import { API_ROUTES_GET }            from "../../../app/routes/distionary";
import { set }                       from "../../../modules/meta/actions";

import { add, error, loaded, UNMOUNT } from "../actions";
import { getHasData }                  from "../selectors";
import { defaultReducer }              from "../reducers";


export default function* () {
  yield put(addReducer(PAGES_KEYS.CATS_LIST, defaultReducer));

  let listeners: Task[] = [];

  yield call(getPageData);

  yield take(UNMOUNT);
  listeners.forEach(l => l.cancel());
  yield put(removeReducer(PAGES_KEYS.CATS_LIST));
}

export function* getPageData() {
  const hasData = yield select(getHasData);

  if (!hasData) {
    try {
      const { meta, ...data } = yield call(get, generateApiUrl(API_ROUTES_GET.PAGE_ABOUT));

      yield put(set(meta));
      yield put(add(data));
    } catch (e) {
      console.error(e);
      yield put(error(e.message));
    }

  }
  yield put(loaded());
}
