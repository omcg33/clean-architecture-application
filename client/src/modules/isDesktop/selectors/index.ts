import { createSelector } from "../../../utils/memoization";

export const getIsDesktop: (state: any) => boolean = createSelector(
  (state) => state.isDesktop,
  (value: any) => value
);
