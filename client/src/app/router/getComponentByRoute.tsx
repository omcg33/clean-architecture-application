import React from "react";
import Loadable                                from "react-loadable"; // Обязательно default'ный импорт!!!!


import { PAGES_URL_ALIASES } from "../../../../common/dist";

import Loading    from "../../components/Loading";


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


// const LoadableNotFoundPage = Loadable({
//   loader: () => import(/* webpackChunkName: "notFoundPage" */ "../../pages/NotFound"),
//   loading: Loading
// });


const routesProps = {
  [PAGES_URL_ALIASES.MAIN]: <LoadableMain/>,
  [PAGES_URL_ALIASES.CATS_LIST]: LoadableCatsList,
  [PAGES_URL_ALIASES.DOGS_LIST]: LoadableDogsList,
  [PAGES_URL_ALIASES.DOG]: LoadableDog,
  [PAGES_URL_ALIASES.CAT]: LoadableCat,
};

export const getComponentByRoute = (route: PAGES_URL_ALIASES) => {
    console.log(route, routesProps[route]);
    return routesProps[route];
}