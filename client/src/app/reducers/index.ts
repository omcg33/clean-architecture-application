import { Map, List } from "immutable";

import { config }        from "../../modules/config/reducers";
import { meta }          from "../../modules/meta/reducers";
import { isDesktop }     from "../../modules/isDesktop/reducers";
import { user }          from "../../modules/user/reducers";

export const staticReducers = {
  config,
  meta,
  user,
  isDesktop,
};

export const stubMap = (_ = Map()) => _;
export const stubList = (_ = List()) => _;
export const stubString = (_ = "") => _;
export const stubBoolean = (_ = false) => _;