import { createSelector } from '../../../utils/memoization';
import { PAGES_KEYS } from "../../../../../consts"
import { IState } from './interfaces';

export const getData = createSelector(
  (state: IState) => state[PAGES_KEYS.MAIN],
  (hasData: any) => hasData,
);

export const getHasData = createSelector(
  (state: IState) => !!state[PAGES_KEYS.MAIN] && !state[PAGES_KEYS.MAIN]!.isEmpty(),
  (hasData: boolean) => hasData,
);

export const getCats = createSelector(
  (state: IState) => getData(state)?.get('cats'),
  (data: any) => data,
);

export const getDogs = createSelector(
  (state: IState) => getData(state)?.get('dogs'),
  (data: any) => data,
);
