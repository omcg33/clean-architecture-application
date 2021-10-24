import { Map, List } from "immutable";

import { config }        from "../../modules/config/reducers";
import { meta }          from "../../modules/meta/reducers";
import { isDesktop }     from "../../modules/isDesktop/reducers";

export const staticReducers = {
  config,
  meta,
  isDesktop,
};

export const stubMap = (_ = Map()) => _;
export const stubList = (_ = List()) => _;
export const stubString = (_ = "") => _;
export const stubBoolean = (_ = false) => _;