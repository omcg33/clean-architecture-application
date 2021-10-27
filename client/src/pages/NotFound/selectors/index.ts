import { createSelector } from '../../../utils/memoization';
import { PAGES_KEYS } from "../../../../../consts"
import { IState } from './interfaces';

export const getData = createSelector(
	(state: IState) => state[PAGES_KEYS.NOT_FOUND],
	(hasData: any) => hasData,
);

export const getHasData = createSelector(
	(state: IState) => !!state[PAGES_KEYS.NOT_FOUND] && !state[PAGES_KEYS.NOT_FOUND]!.isEmpty(),
	(hasData: boolean) => hasData,
);