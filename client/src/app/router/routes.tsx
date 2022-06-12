import React from "react";
import Loadable from "react-loadable"; // Обязательно default'ный импорт!!!!
import { RouteProps } from "react-router-dom";
import { compose }    from "redux";
import { PAGES_URL_ALIASES } from "../../../../common/dist";

import Loading    from "../../components/Loading";
import { decorateBy404 } from "./decorators";

import { pagesRoutes } from "./helpers";

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

const LoadableDog = Loadable({
  loader: () => import(/* webpackChunkName: "dogPage" */ "../../pages/Dog"),
  loading: Loading
});

const LoadableCat = Loadable({
  loader: () => import(/* webpackChunkName: "catPage" */ "../../pages/Cat"),
  loading: Loading
});

const LoadableNotFoundPage = Loadable({
  loader: () => import(/* webpackChunkName: "notFoundPage" */ "../../pages/NotFound"),
  loading: Loading
});

const availableRoutesProps = {
  [PAGES_URL_ALIASES.MAIN]: {
    exact: true,
    element: <LoadableMain/>
  },
  [PAGES_URL_ALIASES.CATS_LIST]: {
    exact: true,
    element: <LoadableCatsList/>
  },
  [PAGES_URL_ALIASES.CAT]: {
    exact: true,
    element: <LoadableCat/>
  },
  [PAGES_URL_ALIASES.DOGS_LIST]: {
    exact: true,
    element: <LoadableDogsList/>
  },
  [PAGES_URL_ALIASES.DOG]: {
    exact: true,
    element: <LoadableDog/>
  },
};


export const getRoutes = (): RouteProps[] => {
  return Object.entries(availableRoutesProps)
    .reduce( (acc, [alias, props]) => {
      const route = pagesRoutes.find(route => route.alias === alias);

      if (route) {
        const [ newProps ] = compose(decorateBy404(LoadableNotFoundPage))([props, route.alias]);

        acc.unshift({
          path: route.template,
          ...newProps,
        })
      }

      return acc;
     
    }, [
      {
        path: "*",
        element: <LoadableNotFoundPage/>
      }
    ] as RouteProps[])
  }