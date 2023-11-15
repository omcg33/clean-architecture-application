import { NAMED_ROUTES } from '@src/modules/common/http';
import {
  PAGES_ROUTES,
  API_ROUTES,
  PAGES_URL_ALIASES,
  API_URL_ALIASES_GET,
  API_URL_ALIASES_POST,
  API_URL_ALIASES_PATCH,
  API_URL_ALIASES_PUT,
  API_URL_ALIASES_DELETE,
} from '@clean-arch/common';

// TODO: типизация
export const filterApiRoutes = (routes: NAMED_ROUTES): API_ROUTES => {
  const output: any = {
    GET: {},
    POST: {},
    PATCH: {},
    PUT: {},
    DELETE: {},
  };

  return Object.entries(routes).reduce((apiRoutes, [routeAlias, route]) => {
    if (Object.values(API_URL_ALIASES_GET).includes(routeAlias as any)) {
      apiRoutes['GET'][routeAlias] = route;
    }

    if (Object.values(API_URL_ALIASES_POST).includes(routeAlias as any)) {
      apiRoutes['POST'][routeAlias] = route;
    }

    if (Object.values(API_URL_ALIASES_PATCH).includes(routeAlias as any)) {
      apiRoutes['PATCH'][routeAlias] = route;
    }

    if (Object.values(API_URL_ALIASES_PUT).includes(routeAlias as any)) {
      apiRoutes['PUT'][routeAlias] = route;
    }

    if (Object.values(API_URL_ALIASES_DELETE).includes(routeAlias as any)) {
      apiRoutes['DELETE'][routeAlias] = route;
    }

    return apiRoutes;
  }, output);
};

export const filterPagesRoutes = (routes: NAMED_ROUTES): PAGES_ROUTES => {
  return Object.entries(routes).reduce((pagesRoutes, [routeAlias, route]) => {
    if (Object.values(PAGES_URL_ALIASES).includes(routeAlias as any)) {
      pagesRoutes.push({
        alias: routeAlias,
        template: route,
      });
    }

    return pagesRoutes;
  }, []);
};
// export const convertRoutesObjectToRoutesArray = (routes: Record<string, string>):IRoute[] => {
//     return Object.entries(routes).reduce((acc, [routeAlias, routeValue]) => {
//         acc.push({alias: routeAlias, template: routeValue});
//         return acc;
//     }, []);
// }
