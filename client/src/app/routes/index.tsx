// import React                                   from "react";
import { RouteProps }                          from "react-router-dom";
import Loadable                                from "react-loadable"; // Обязательно default'ный импорт!!!!


import { PAGES_URL_ALIASES } from "../../../../common";

import Loading    from "../../components/Loading";
import { pageRoutes } from "./helpers";


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

