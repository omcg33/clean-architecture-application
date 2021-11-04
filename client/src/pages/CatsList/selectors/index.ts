import { createSelector }   from '../../../utils/memoization';
import { PAGES_KEYS } from "../../../../../consts"
import {IState}             from './interfaces';

export const getData = createSelector(
	(state: IState) => state[PAGES_KEYS.CATS_LIST],
	(hasData: any) => hasData,
  );
  
  export const getHasData = createSelector(
	(state: IState) => !!state[PAGES_KEYS.CATS_LIST] && !state[PAGES_KEYS.CATS_LIST]!.isEmpty(),
	(hasData: boolean) => hasData,
  );
  
export const getCats = createSelector(
  (state: IState) => getData(state)?.get('cats'),
  (data: any) => data,
);
