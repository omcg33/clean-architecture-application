import { Map, List } from "immutable";

import { meta }          from "../../modules/meta/reducers";
import { isDesktop }     from "../../modules/isDesktop/reducers";


export const stubMap = (_ = Map()) => _;
export const stubList = (_ = List()) => _;
export const stubString = (_ = "") => _;
export const stubBoolean = (_ = false) => _;


export const staticReducers = {
  config: stubMap,
  meta,
  isDesktop,
  location: stubMap,
};