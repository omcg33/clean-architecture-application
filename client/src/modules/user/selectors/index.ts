import { createSelector } from '../../../utils/memoization';

export const getUser = createSelector(
  (state: any) => state.user,
  (data: any) => data
);

export const isUserAuthorized = createSelector(
  (state: any) => state.user && state.user.get("isAuthorized", false),
  (data: boolean) => data
);
