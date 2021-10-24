import { createSelector } from '../../../utils/memoization';


export const getMeta = createSelector(
  (state: any) => state.meta,
  (data: any) => data
);


export default {};
