import "babel-polyfill";

import React        from "react";
import ReactDOM     from "react-dom";
import Loadable     from "react-loadable";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router5";

import createStore from "./store";
import { App }     from "./app";

// import history               from "./app/history";
import rootSaga              from "./app/sagas";
import { createRootReducer } from "./app/helpers";
import { staticReducers }    from "./app/reducers";

import { createRouter, createRoutes, setRouter } from "./app/router";
import { setPageRoutes, setApiRoutes, pagesRoutes }      from "./app/router/helpers";

import { getConfig }     from "./modules/config/selectors";

export const render = () => {
  setPageRoutes(window.__PAGES_ROUTES__);
  setApiRoutes(window.__API_ROUTES__);
  
  const { is404 = false, ...preloadedState } = window.__PRELOADED_STATE__;

  const [store] = createStore(createRootReducer(preloadedState, staticReducers), rootSaga, preloadedState);
  const router = createRouter(createRoutes(pagesRoutes));

  setRouter(router);

  router.setDependency('store', store);

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

  Loadable.preloadReady().then(() => {
    router.start(renderApp)    
  });
};
