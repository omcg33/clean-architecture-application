import { Task } from "redux-saga";
import { call, all, put, select, take } from "redux-saga/effects";

import { 
  PAGES_KEYS, API_URL_ALIASES_GET, 
  // PAGES_URL_ALIASES 
} from "../../../../../common/dist";

import { get } from "../../../helpers/httpClient";


import { addReducer, removeReducer } from "../../../app/actions";
import { setHistoryState }           from "../../../app/history";
import { generateApiUrl }            from "../../../app/router/helpers";
// import { set }                       from "../../../modules/meta/actions";

import { add, error, loaded, UNMOUNT } from "../actions";
import { getHasData } from "../selectors";
import { defaultReducer } from "../reducers";
import { CatPageService } from "../../../services/pages/cat";

export interface IGetPageDataParams {
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
      const data = yield call(CatPageService.get, { params }));

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
  // yield put(replaceReducer(PAGES_KEYS.CATS_LIST, pageReducer));
  yield put(loaded());
}
