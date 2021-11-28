// import React                                   from "react";
import { RouteProps }                          from "react-router-dom";
import Loadable                                from "react-loadable"; // Обязательно default'ный импорт!!!!
import * as pathToRegexp from "path-to-regexp";

import { PAGES_URL_ALIASES } from "../../../../common";

import Loading    from "../../components/Loading";
// import { is404 }  from "../helpers";
import { IRoute } from "../interfaces";

import { 
  apiRoutesGet, apiRoutesPost, apiRoutesPatch, apiRoutesPut, apiRoutesDelete,
  API_ROUTES_GET, API_ROUTES_POST, API_ROUTES_PATCH, API_ROUTES_PUT, API_ROUTES_DELETE
} from "./distionary";

interface IOptions {
  params?: Object;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
}

let pageRoutes: IRoute[] = [];
let pageRoutesObject: Record<PAGES_URL_ALIASES, string>;


const LoadableMain = Loadable({
  loader: () => import(/* webpackChunkName: "mainPage" */ "../../pages/Main"), 
  loading: Loading
});


const LoadableCatsList = Loadable({
  loader: () => import(/* webpackChunkName: "catsListPage" */ "../../pages/CatsList"),
  loading: Loading
});

const LoadableDogsList = Loadable({
  loader: () => import(/* webpackChunkName: "dogsListPage" */ "../../pages/DogsList"),
  loading: Loading
});

const LoadableNotFoundPage = Loadable({
  loader: () => import(/* webpackChunkName: "notFoundPage" */ "../../pages/NotFound"),
  loading: Loading
});


const routesProps: {[key: string]: RouteProps} = {
  [PAGES_URL_ALIASES.MAIN]: {
    exact: true,
    component: LoadableMain
  },
  [PAGES_URL_ALIASES.CATS_LIST]: {
    exact: true,
    component: LoadableCatsList,
  },
  [PAGES_URL_ALIASES.DOGS_LIST]: {
    exact: true,
    component: LoadableDogsList,
  },
};

export const setPageRoutes = (routes: IRoute[]) => {
  pageRoutes = routes.map(route => ({...route, template: route.template.replace("(?:*)", "(.*)")}));
  pageRoutesObject = pageRoutes.reduce<Record<PAGES_URL_ALIASES, string>>((acc, route) => ({...acc, [route.alias]: route.template }), {} as any);
};

export const generatePageUrl = (alias, params = {}) => {
  if (!Object.keys(pageRoutesObject).includes(alias))
    throw new ReferenceError(`Неизвестный алиас для роута страницы ${alias}`);

  try {
    return pathToRegexp.compile(pageRoutesObject[alias])(params);
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }
};

// TODO: Заменить на сервисы
export const generateApiUrl = (
  alias: API_ROUTES_GET | API_ROUTES_POST | API_ROUTES_PATCH | API_ROUTES_PUT | API_ROUTES_DELETE,
  options?: IOptions
) => {
  const params = options && options.params ? options.params : {},
    method = options && options.method ? options.method : "GET";

  switch (method) {
    case "GET": {
      if (!Object.values(API_ROUTES_GET).includes(alias as API_ROUTES_GET))
        throw new ReferenceError(`Не найден роут: method=${method}, alias=${alias}`);

      return pathToRegexp.compile(apiRoutesGet[alias])(params);
    }
    case "POST": {
      if (!Object.values(API_ROUTES_POST).includes(alias as API_ROUTES_POST))
        throw new ReferenceError(`Не найден роут: method=${method}, alias=${alias}`);

      return pathToRegexp.compile(apiRoutesPost[alias])(params);
    }
    case "PATCH": {
      if (!Object.values(API_ROUTES_PATCH).includes(alias as API_ROUTES_PATCH))
        throw new ReferenceError(`Не найден роут: method=${method}, alias=${alias}`);

      return pathToRegexp.compile(apiRoutesPatch[alias])(params);
    }
    case "PUT": {
      if (!Object.values(API_ROUTES_PUT).includes(alias as API_ROUTES_PUT))
        throw new ReferenceError(`Не найден роут: method=${method}, alias=${alias}`);

      return pathToRegexp.compile(apiRoutesPut[alias])(params);
    }
    case "DELETE": {
      if (!Object.values(API_ROUTES_DELETE).includes(alias as API_ROUTES_DELETE))
        throw new ReferenceError(`Не найден роут: method=${method}, alias=${alias}`);

      return pathToRegexp.compile(apiRoutesDelete[alias])(params);
    }
  }
  throw new ReferenceError(`Неизвестный метод для api: ${method}`);
};

export const getRoutes = (): RouteProps[] => {
  return pageRoutes
    .filter(route => !!route.template)
    .map(route => {
      const props = routesProps[route.alias];

      if (!props) {
        throw new Error(`Не удалось найти обработчик для роута ${route.alias} (${JSON.stringify(pageRoutes)})`);
      }

      return {
        path: route.template,
        ...props
      };
    })
    .concat([{
      path: "",
      component: LoadableNotFoundPage
    }]);
};

