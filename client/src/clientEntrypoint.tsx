import "babel-polyfill";

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

import React        from "react";
import ReactDOM     from "react-dom";
import Loadable     from "react-loadable";
import { Provider } from "react-redux";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import createStore                                 from "./store";
import { App }                                     from "./app";
import { history, IHistoryLocationState }          from "./app/history";
import { rootSaga }                                from "./app/sagas";
import { createRootReducer, setWebpackPublicPath } from "./app/helpers";
import { staticReducers }                          from "./app/reducers";
import { setPageRoutes, setApiRoutes }             from "./app/router/helpers";

import { getConfig }     from "./modules/config/selectors";

export const render = () => {
  setPageRoutes(window.__PAGES_ROUTES__);
  setApiRoutes(window.__API_ROUTES__);
  
  const { is404 = false, ...preloadedState } = window.__PRELOADED_STATE__;

  const [store] = createStore(createRootReducer(preloadedState, staticReducers), rootSaga, preloadedState);
  const clientConfig = getConfig(store.getState());
 
  setWebpackPublicPath(clientConfig)

  // Регидрация стилей
  const generatedStyles = document.getElementById("server-side-styles");
  if (!!generatedStyles) generatedStyles.remove();

  const { state: clientHistoryLocationState, ...restClientLocation } = history.location;
  const { state: serverHistoryLocationState, ...restServerLocation } = preloadedState.location || {};

  history.replace({
    ...restClientLocation,
    ...restServerLocation
  },{
    ...(clientHistoryLocationState as IHistoryLocationState),
    ...serverHistoryLocationState
  })

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
