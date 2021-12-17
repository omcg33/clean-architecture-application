import { createSelector } from '../../../utils/memoization';
import { PAGES_KEYS } from "../../../../../common/dist"
import { IState } from './interfaces';

export const getData = createSelector(
  (state: IState) => state[PAGES_KEYS.DOG],
  (hasData: any) => hasData,
);

export const getHasData = createSelector(
  (state: IState) => !!state[PAGES_KEYS.DOG] && !state[PAGES_KEYS.DOG]!.isEmpty(),
  (hasData: boolean) => hasData,
);

export const getDog = createSelector(
  (state: IState) => getData(state)?.get('dog'),
  (data: any) => data,
);
