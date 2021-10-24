import { createSelector }   from '../../../utils/memoization';

import {IState}             from './interfaces';

/**
 * select loading status
 */
export const getLoading = createSelector(
	(state: IState) => state.dogsListPage.get('loading'),
	(loading: boolean) => loading
);

/**
 * Select page data
 */
export const getData = createSelector(
	(state: IState) => state.dogsListPage.get('data'),
	(data: any) => data
);

export const getHasData = createSelector(
	(state: IState) => !!state.dogsListPage.get('data'),
	(hasData: boolean) => hasData,
);

export const getDogs = createSelector(
  (state: IState) => state.dogsListPage.getIn(['data', 'dogs']),
  (data: any) => data,
);

export default {};
