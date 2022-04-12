// import React from "react";
import Loadable from "react-loadable"; // Обязательно default'ный импорт!!!!

import { PAGES_URL_ALIASES } from "../../../../common/dist";

import Loading    from "../../components/Loading";

// import { getIs404 } from "./helpers";

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

export const routes = [
  {
    path: PAGES_URL_ALIASES.MAIN,
    component: LoadableMain
  },

  {
    path: PAGES_URL_ALIASES.CATS_LIST,
    component: LoadableCatsList
  },
  {
    path: PAGES_URL_ALIASES.CAT,
    component: LoadableCat
  },

  {
    path: PAGES_URL_ALIASES.DOGS_LIST,
    component: LoadableDogsList
  },
  {
    path: PAGES_URL_ALIASES.DOG,
    component: LoadableDog
  },

  {
    path: '*',
    component: LoadableNotFoundPage
  },
  
];