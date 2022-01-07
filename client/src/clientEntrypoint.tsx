import "babel-polyfill";

import React        from "react";
import ReactDOM     from "react-dom";
import Loadable     from "react-loadable";
import { Provider } from "react-redux";
// import { Router }   from "react-router-dom";
import { RouterProvider } from "react-router5";

import { PAGES_URL_ALIASES } from "../../common";

import createStore from "./store";
import { App }     from "./app";

// import history               from "./app/history";
import rootSaga              from "./app/sagas";
import { createRootReducer } from "./app/helpers";
import { staticReducers }    from "./app/reducers";

import { createRouter, createRoutes } from "./app/router";
import { pageRoutes } from "./app/routes/helpers";

import { setPageRoutes, setApiRoutes }      from "./app/routes/helpers";

import { getConfig }     from "./modules/config/selectors";

// export interface IConfig {

// }

export const render = () => {
  setPageRoutes(window.__PAGES_ROUTES__);
  setApiRoutes(window.__API_ROUTES__);
  const { is404 = false, ...preloadedState } = window.__PRELOADED_STATE__;

  const [store] = createStore(createRootReducer(preloadedState, staticReducers), rootSaga, preloadedState);
  const router = createRouter(createRoutes(pageRoutes), PAGES_URL_ALIASES.MAIN);

  console.log(createRoutes(pageRoutes));

  // window.__PRELOADED_STATE__ = undefined;
  // window.__ROUTES__ = undefined;


  const clientConfig = getConfig(store.getState()),
    cdn = clientConfig.getIn(["apiHosts", "cdn"]);

  if (cdn)
    __webpack_public_path__ = cdn;

  // Регидрация стилей
  const generatedStyles = document.getElementById("server-side-styles");
  if (!!generatedStyles) generatedStyles.remove();

  const renderApp = () => (
    ReactDOM.hydrate(
      <Provider store={store}>
        <RouterProvider router={router}>
          <App/>
        </RouterProvider>
      </Provider>,
      document.getElementById("root")
    )
  )
  // Устанавливаем state на основе данных с сервера
  // const location = history.location;
  // history.replace({
  //   ...location,
  //   state: {...location.state, is404}
  // });

  Loadable.preloadReady().then(() => {
    router.setDependency('store', store);
    router.start(renderApp)    
  });
};
