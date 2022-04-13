import { Reducer } from "redux";
import omit        from "lodash-es/omit";

import { ILocation } from '../../../../common';

import { stubMap } from "../reducers";

export const is404 = (location: ILocation) => {
  const { state: { is404 = false } = {}} = location || {};
  return is404;
};

export const createRootReducer = (preloadedState: Object, staticReducers: {[key: string]: Reducer<any,any>}): {[key: string]: Reducer<any,any>} => {
  return Object.entries(omit(preloadedState, Object.keys(staticReducers)))
    .reduce((acc, [key]) => ({...acc, [key]: stubMap}), staticReducers)
};
