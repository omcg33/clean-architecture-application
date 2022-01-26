import { Task }                    from "redux-saga";
import { call, all, put, select, take } from "redux-saga/effects";

import { PAGES_KEYS, API_URL_ALIASES_GET } from "../../../../../common";

import { get } from "../../../libs/xhr";


import { addReducer, removeReducer } from "../../../app/actions";
import { generateApiUrl }            from "../../../app/router/helpers";

import { add, error, loaded, UNMOUNT } from "../actions";
import { getHasData }                  from "../selectors";
import { defaultReducer }              from "../reducers";


export default function* () {
  yield put(addReducer(PAGES_KEYS.MAIN, defaultReducer));

  let listeners: Task[] = [];

  yield call(getPageData);

  yield take(UNMOUNT);
  listeners.forEach(l => l.cancel());
  yield put(removeReducer(PAGES_KEYS.MAIN));
}

export function* getPageData() {
  const hasData = yield select(getHasData);

  if (!hasData) {
    try {
      // TODO: Заменить на вызов сервиса
      const { meta, ...data } = yield call(get, generateApiUrl(API_URL_ALIASES_GET.PAGE_MAIN));

      yield all([
        // put(set(meta)),
        put(add(data))
      ])
    } catch (e) {
      console.error(e);
      yield put(error((e as any).message));
    }

  }
  // Если на странице есть дин данные
  // yield put(replaceReducer(PAGES_KEYS.MAIN, pageReducer));
  yield put(loaded());
}
