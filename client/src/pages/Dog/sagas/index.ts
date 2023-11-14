import { Task }                    from "redux-saga";
import { call, all, put, select, take } from "redux-saga/effects";

import { 
  PAGES_KEYS, API_URL_ALIASES_GET,
  // PAGES_URL_ALIASES 
} from "../../../../../common";

import { get } from "../../../libs/xhr";


import { addReducer, removeReducer, replaceReducer } from "../../../app/actions";
import { generateApiUrl }                            from "../../../app/router/helpers";
// import { router }                                    from "../../../app/router";
// import { set }                       from "../../../modules/meta/actions";

import { add, error, loaded, UNMOUNT } from "../actions";
import { getHasData }                  from "../selectors";
import { defaultReducer, pageReducer } from "../reducers";
import { setHistoryState } from "../../../app/history";

export interface IGetPageDataParams {
  id: number
}

export default function* (params: IGetPageDataParams) {
  yield put(addReducer(PAGES_KEYS.DOG, defaultReducer));

  let listeners: Task[] = [];

  yield call(getPageData, params);

  yield take(UNMOUNT);
  listeners.forEach(l => l.cancel());
  yield put(removeReducer(PAGES_KEYS.DOG));
}

export function* getPageData(params: IGetPageDataParams) {
  const hasData = yield select(getHasData);

  if (!hasData) {
    try {
      // TODO: Заменить на вызов сервиса
      const data = yield call(get, generateApiUrl(API_URL_ALIASES_GET.PAGE_DOG, { params } ));

      yield all([
        // put(set(meta)),
        put(add(data))
      ])
    } catch (e) {
      console.error(e);
      yield put(error((e as any).message));
      
      if ((e as any).response.status === 404) {
        yield call(() => setHistoryState({is404: true}));
        return;
      }
    }

  }
  // Если на странице есть дин данные
  yield put(replaceReducer(PAGES_KEYS.DOG, pageReducer));
  yield put(loaded());
}
