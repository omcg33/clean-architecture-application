import { Task }                    from "redux-saga";
import { call, all, put, select, take } from "redux-saga/effects";

import { PAGES_KEYS, API_URL_ALIASES_GET } from "../../../../../common/dist";

import { get } from "../../../libs/xhr";


import { addReducer, removeReducer } from "../../../app/actions";
import { generateApiUrl }            from "../../../app/routes/helpers";
// import { set }                       from "../../../modules/meta/actions";

import { add, error, loaded, UNMOUNT } from "../actions";
import { getHasData }                  from "../selectors";
import { defaultReducer }              from "../reducers";

interface IGetPageDataParams {
  id: number
}

export default function* (params: IGetPageDataParams) {
  yield put(addReducer(PAGES_KEYS.CAT, defaultReducer));

  let listeners: Task[] = [];

  yield call(getPageData, params);

  yield take(UNMOUNT);
  listeners.forEach(l => l.cancel());
  yield put(removeReducer(PAGES_KEYS.CAT));
}

export function* getPageData(params: IGetPageDataParams) {
  const hasData = yield select(getHasData);

  if (!hasData) {
    try {
      // TODO: Заменить на вызов сервиса
      const data = yield call(get, generateApiUrl(API_URL_ALIASES_GET.PAGE_CAT, { params }));

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
  // yield put(replaceReducer(PAGES_KEYS.CATS_LIST, pageReducer));
  yield put(loaded());
}
