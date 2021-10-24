import { createSelector }   from '../../../utils/memoization';

import {IState}             from './interfaces';

/**
 * select loading status
 */
export const getLoading = createSelector(
	(state: IState) => state.notFoundPage.get('loading'),
	(loading: boolean) => loading
);

/**
 * Select page data
 */
export const getData = createSelector(
	(state: IState) => state.notFoundPage.get('data'),
	(data: any) => data
);

export const getHasData = createSelector(
	(state: IState) => !!state.notFoundPage.get('data'),
	(hasData: boolean) => hasData,
);

export default {};
