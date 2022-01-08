import React from "react";
import Loadable                                from "react-loadable"; // Обязательно default'ный импорт!!!!


import { PAGES_URL_ALIASES } from "../../../../common";

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

const LoadableNotFoundPage = Loadable({
  loader: () => import(/* webpackChunkName: "notFoundPage" */ "../../pages/NotFound"),
  loading: Loading
});

export const getComponentByRoute = (route: PAGES_URL_ALIASES) => {  
    switch (route) {
      case PAGES_URL_ALIASES.MAIN:
          return <LoadableMain/>;
      case PAGES_URL_ALIASES.CATS_LIST:
          return <LoadableCatsList/>;
      case PAGES_URL_ALIASES.DOGS_LIST:
          return <LoadableDogsList/>; 
      case PAGES_URL_ALIASES.DOG:
          return <LoadableDog/>;  
      case PAGES_URL_ALIASES.CAT:
          return <LoadableCat/>;    
      default:
          return <LoadableNotFoundPage/>
    }     
}