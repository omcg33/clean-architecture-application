import { createSelector } from '../../../utils/memoization';
import { PAGES_KEYS } from "../../../../../common/dist"
import { IState } from './interfaces';

export const getData = createSelector(
  (state: IState) => state[PAGES_KEYS.CAT],
  (hasData: any) => hasData,
);

export const getHasData = createSelector(
  (state: IState) => !!state[PAGES_KEYS.CAT] && !state[PAGES_KEYS.CAT]!.isEmpty(),
  (hasData: boolean) => hasData,
);

export const getCat = createSelector(
  (state: IState) => getData(state)?.get('cat'),
  (data: any) => data,
);
