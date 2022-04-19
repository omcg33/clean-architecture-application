import "babel-polyfill";

import React        from "react";
import ReactDOM     from "react-dom";
import Loadable     from "react-loadable";
import { Provider } from "react-redux";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import createStore from "./store";
import { App }     from "./app";
import { history } from "./app/history";

// import history               from "./app/history";
import rootSaga              from "./app/sagas";
import { createRootReducer } from "./app/helpers";
import { staticReducers }    from "./app/reducers";

import { setPageRoutes, setApiRoutes }      from "./app/router/helpers";

import { getConfig }     from "./modules/config/selectors";

export const render = () => {
  setPageRoutes(window.__PAGES_ROUTES__);
  setApiRoutes(window.__API_ROUTES__);
  
  const { is404 = false, ...preloadedState } = window.__PRELOADED_STATE__;

  const [store] = createStore(createRootReducer(preloadedState, staticReducers), rootSaga, preloadedState);
 
  // window.__PRELOADED_STATE__ = undefined;
  // window.__ROUTES__ = undefined;


  const clientConfig = getConfig(store.getState()),
    cdn = clientConfig.getIn(["apiHosts", "cdn"]);

  if (cdn)
    __webpack_public_path__ = cdn;

  // Регидрация стилей
  const generatedStyles = document.getElementById("server-side-styles");
  if (!!generatedStyles) generatedStyles.remove();

  const location = history.location;
  const serverLocation = preloadedState.location || {};

  history.replace({
    ...location,
    ...serverLocation,
    hash: location.hash
  });

  const renderApp = () => (
    ReactDOM.hydrate(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App/>
        </HistoryRouter>
      </Provider>,
      document.getElementById("root")
    )
  )

  Loadable.preloadReady().then(() => {
    renderApp();
  });
};
