import { createSelector }   from '../../../utils/memoization';

import {IState}             from './interfaces';

/**
 * select loading status
 */
export const getLoading = createSelector(
	(state: IState) => state.catsListPage.get('loading'),
	(loading: boolean) => loading
);

/**
 * Select page data
 */
export const getData = createSelector(
	(state: IState) => state.catsListPage.get('data'),
	(data: any) => data
);

export const getHasData = createSelector(
	(state: IState) => !!state.catsListPage.get('data'),
	(hasData: boolean) => hasData,
);

export const getCats = createSelector(
  (state: IState) => state.catsListPage.getIn(['data', 'cats']),
  (data: any) => data,
);

export default {};
