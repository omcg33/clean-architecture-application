import React            from "react";
import ReactDOMServer   from "react-dom/server";
import { Provider }     from "react-redux";
import Loadable         from "react-loadable";
import { getBundles }   from "react-loadable-ssr-addon";
// import Helmet           from "react-helmet";
import { Location }     from "history";
import serialize        from "serialize-javascript";
import { StaticRouter}  from "react-router-dom//server";

import { PAGES_ROUTES, API_ROUTES, IRenderResult, SSRender } from "../../common";

import createStore                 from "./store";

import { App }                     from "./app";
import { createRootReducer }       from "./app/helpers";
import { staticReducers }          from "./app/reducers";
import { setPageRoutes, setApiRoutes } from "./app/router/helpers";

import { convertCssAssetsToCriticalCssString, convertCssAssetsToString, convertJsAssetsToString } from './utils';

export interface IRenderParams { 
  stats: Record<string, any>;
  assetsPath: string;

  state: Record<string, any>;

  pagesRoutes: PAGES_ROUTES;
  apiRoutes: API_ROUTES;
  location: Location;  
}

export const render:SSRender<IRenderParams> = (params: IRenderParams): IRenderResult  => {
  const { location, pagesRoutes, apiRoutes, state, stats, assetsPath } = params;

  setPageRoutes(pagesRoutes);
  setApiRoutes(apiRoutes);

  const preloadedState = state || {};
  const [store] = createStore(createRootReducer(preloadedState, staticReducers), undefined, preloadedState);    
  const modules = new Set();

  const html = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.add(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={location}>
          <App/>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
  // const helmet = Helmet.renderStatic();

  const { css = [], js = [] } = getBundles(stats, [...stats.entrypoints, ...Array.from(modules)]);

  return {
    // helmet,
    html,
    styles: convertCssAssetsToCriticalCssString(css, { publicPath: __webpack_public_path__, fileSystemPath: assetsPath}) + convertCssAssetsToString(css, __webpack_public_path__),
    scripts: convertJsAssetsToString(js, __webpack_public_path__),
    preloadedState: serialize(state, { isJSON: true }),
    pagesRoutes: serialize(pagesRoutes, { isJSON: true }),
    apiRoutes: serialize(apiRoutes, { isJSON: true }),
  };
};