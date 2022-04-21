import React            from "react";
import ReactDOMServer   from "react-dom/server";
import { Provider }     from "react-redux";
import Loadable         from "react-loadable";
import { getBundles }   from "react-loadable-ssr-addon";
import Helmet           from "react-helmet";
// import csso               from "csso";
import serialize        from "serialize-javascript";
import { RouterProvider } from "react-router5";

import { CreateSSRender, PAGES_ROUTES, API_ROUTES } from "../../common";

import createStore                 from "./store";

import { App }                     from "./app";
import { createRootReducer }       from "./app/helpers";
import { staticReducers }          from "./app/reducers";
import { createRouter, createRoutes, setRouter } from "./app/router";
import { setPageRoutes, setApiRoutes } from "./app/router/helpers";

import { convertCssAssetsToCriticalCssString, convertCssAssetsToString, convertJsAssetsToString } from './utils';

//TODO: Исправить
interface ICreateSSRenderParams {
  stats: any;
  assetsPath: string;
};

interface ISSRenderParams { 
  pagesRoutes: PAGES_ROUTES;
  apiRoutes: API_ROUTES;
  location: string;
  state: Record<string, any>;
}

export const createSSRender:CreateSSRender<ICreateSSRenderParams, ISSRenderParams> = ({ stats, assetsPath }) => { 
  
  return ({ location, pagesRoutes, apiRoutes, state }) => {
    setPageRoutes(pagesRoutes);
    setApiRoutes(apiRoutes);

    const preloadedState = state || {};
    const [store] = createStore(createRootReducer(preloadedState, staticReducers), undefined, preloadedState);    
    const router = createRouter(createRoutes(pagesRoutes));
    setRouter(router);
    
    router.setDependency('store', store);
    router.start(location);

    const modules = new Set();

    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.add(moduleName)}>
        <Provider store={store}>
          <RouterProvider router={router}>
            <App/>
          </RouterProvider>
        </Provider>
      </Loadable.Capture>
    );
    const helmet = Helmet.renderStatic();

    const { css = [], js = [] } = getBundles(stats, [...stats.entrypoints, ...Array.from(modules)]);

    return {
      helmet,
      html,
      styles: convertCssAssetsToCriticalCssString(css, { publicPath: __webpack_public_path__, fileSystemPath: assetsPath}) + convertCssAssetsToString(css, __webpack_public_path__),
      scripts: convertJsAssetsToString(js, __webpack_public_path__),
      preloadedState: serialize(state, { isJSON: true }),
      pagesRoutes: serialize(pagesRoutes, { isJSON: true }),
      apiRoutes: serialize(apiRoutes, { isJSON: true }),
    };
  }
};