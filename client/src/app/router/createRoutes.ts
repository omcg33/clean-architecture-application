// import { runSaga } from 'redux-saga'
import { run as runSaga } from "../actions";
import { PAGES_ROUTES, PAGES_URL_ALIASES } from "../../../../common";

import getMainPageData from "../../pages/Main/sagas";
import { unmount as unmountMainPageAction } from "../../pages/Main/actions";

import getCatPageData from "../../pages/Cat/sagas";
import { unmount as unmountCatPageAction } from "../../pages/Cat/actions";

const routesData = {
  [PAGES_URL_ALIASES.MAIN]: {
    onActivate: () => runSaga({ saga: getMainPageData }),
    onDeactivate: () => unmountMainPageAction(),
  },
  [PAGES_URL_ALIASES.CAT]: {
    onActivate: (params) => runSaga({ saga: getCatPageData, params }),
    onDeactivate: () => unmountCatPageAction(),
  },
}

export const createRoutes = (pageRoutes:PAGES_ROUTES) => {
  return pageRoutes
    .filter(route => !!route.template)
    .map(route => {
      const data = routesData[route.alias];

      // if (!props) {
      //   throw new Error(`Не удалось найти обработчик для роута ${route.alias} (${JSON.stringify(pageRoutes)})`);
      // }

      return {
        name: route.alias,
        path: route.template,
        ...data
      }
    })
}

// export const createRoutes = (pageRoutes:PAGES_ROUTES) => pageRoutes.map(route => ({
//     name: route.alias, 
//     path: route.template,
    
// }));
