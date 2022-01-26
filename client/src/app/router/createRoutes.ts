import { constants } from "router5";

import { run as runSaga } from "../actions";
import { PAGES_ROUTES, PAGES_URL_ALIASES } from "../../../../common";

import getMainPageData from "../../pages/Main/sagas";
import { unmount as unmountMainPageAction } from "../../pages/Main/actions";

import getCatsListPageData from "../../pages/CatsList/sagas";
import { unmount as unmountCatsListPageAction } from "../../pages/CatsList/actions";

import getCatPageData from "../../pages/Cat/sagas";
import { unmount as unmountCatPageAction } from "../../pages/Cat/actions";

import getDogPageData from "../../pages/Dog/sagas";
import { unmount as unmountDogPageAction } from "../../pages/Dog/actions";

import getDogsListPageData from "../../pages/DogsList/sagas";
import { unmount as unmountDogsListPageAction } from "../../pages/DogsList/actions";

import getNotFoundPageData from "../../pages/NotFound/sagas";
import { unmount as unmountNotFoundPageAction } from "../../pages/NotFound/actions";

const routesData = {
  [PAGES_URL_ALIASES.MAIN]: {
    onActivate: () => runSaga({ saga: getMainPageData }),
    onDeactivate: () => unmountMainPageAction(),
  },
  [PAGES_URL_ALIASES.CATS_LIST]: {
    onActivate: (params) => runSaga({ saga: getCatsListPageData, params }),
    onDeactivate: () => unmountCatsListPageAction(),
  },
  [PAGES_URL_ALIASES.CAT]: {
    onActivate: (params) => runSaga({ saga: getCatPageData, params }),
    onDeactivate: () => unmountCatPageAction(),
  },
  [PAGES_URL_ALIASES.DOGS_LIST]: {
    onActivate: (params) => runSaga({ saga: getDogsListPageData, params }),
    onDeactivate: () => unmountDogsListPageAction(),
  },
  [PAGES_URL_ALIASES.DOG]: {
    onActivate: (params) => runSaga({ saga: getDogPageData, params }),
    onDeactivate: () => unmountDogPageAction(),
  },  
}

export const createRoutes = (pageRoutes: PAGES_ROUTES) => {  
  const routes = pageRoutes
    .filter(route => !!route.template)
    .map(route => {
      const data = routesData[route.alias];

      if (!data) {
        throw new Error(`Не удалось найти обработчик для роута ${route.alias} (${JSON.stringify(pageRoutes)})`);
      }

      return {
        name: route.alias,
        path: route.template,
        ...data
      }
    });

  return [
    ...routes,
    {
      name: constants.UNKNOWN_ROUTE,
      path: '/404',
      onActivate: (params) => runSaga({ saga: getNotFoundPageData, params }),
      onDeactivate: () => unmountNotFoundPageAction(),
    }
  ]
}
