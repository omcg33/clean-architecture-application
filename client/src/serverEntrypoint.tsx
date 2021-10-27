import React       from "react";
import ReactDOMServer   from "react-dom/server";
import { Provider }     from "react-redux";
import { StaticRouter } from "react-router-dom";
import Loadable    from "react-loadable";
import { getBundles }   from "react-loadable-ssr-addon";

import Helmet             from "react-helmet";
import csso          from "csso";
import serialize          from "serialize-javascript";


// TODO: Продумать место лучше
import { CreateSSRender } from "../../server/src/interfaces";

import createStore                 from "./store";
import { App }                     from "./app";
import { createRootReducer }       from "./app/helpers";
import { staticReducers }          from "./app/reducers";

//TODO: Исправить
interface ICreateSSRenderParams {
  stats: any,
};

interface ISSRenderParams { 
  pageRoutes: any;
  location: string | object;
}

export const createSSRender:CreateSSRender<ICreateSSRenderParams, ISSRenderParams> = ({ stats }) => { 
  
  return ({ location, pageRoutes, ...state }) => {
    const preloadedState = state,
      [store] = createStore(createRootReducer(preloadedState, staticReducers), undefined, preloadedState);

      console.log("------", store.getState());

    const modules = new Set();
    let context = {};

    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.add(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={location} context={context}>
            <App/>
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    );
    const helmet = Helmet.renderStatic();
    const serverSideStyles = csso.minify({}).css;

    const { css = [], js = [] } = getBundles(stats, [...stats.entrypoints, ...Array.from(modules)]),
      jsException = [] as any[];

    const styles = [
      ...css
        .map(style => `<link href="${__webpack_public_path__}${style.file}" rel="stylesheet"/>`)
    ]
      .join("\n");

    const scripts = [
      ...js
        .reduce((acc, script) => {
          if (script.file.includes("index")) {
            jsException.push(script);
            return acc;
          }

          return [
            ...acc,
            `<script src="${__webpack_public_path__}${script.file}"></script>`
          ];
        }, []),
      ...jsException
        .map(script => `<script src="${__webpack_public_path__}${script.file}"></script>`)
    ]
      .join("\n");

    const inlineStyles = [
      `<style type="text/css" id="server-side-styles">${serverSideStyles}</style>`
    ];

    return {
      helmet,
      html,
      styles,
      scripts,
      inlineStyles,
      routes: serialize(pageRoutes, { isJSON: true }),    
    };
  }
};
