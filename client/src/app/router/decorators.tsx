import React from "react";
import { RouteProps, useLocation } from "react-router-dom";

import { PAGES_URL_ALIASES } from "../../../../common";

import { is404 } from "./helpers";

export const decorateBy404 = (Component: React.ElementType) => ([props, urlAlias]: [RouteProps, PAGES_URL_ALIASES]): [RouteProps, PAGES_URL_ALIASES] => {
    const { children, element, ...rest } = props;
    const location = useLocation();

    return [
      {
        ...rest,
        element: is404(location) ? <Component/> : element
      },
      urlAlias
    ];
  };