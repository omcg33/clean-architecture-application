import * as React       from "react";
import ReactDOMServer   from "react-dom/server";
import { Provider }     from "react-redux";
import { StaticRouter } from "react-router-dom";
import * as Loadable    from "react-loadable";
import { getBundles }   from "react-loadable-ssr-addon";

import { SheetsRegistry } from "react-jss";
import Helmet             from "react-helmet";
import * as csso          from "csso";
import serialize          from "serialize-javascript";

import { AbTesting, IConfig } from "@tutu/ab-testing";
import RootProvider           from "@tutu/order/provider/root";
import { AbTestingProvider }  from "@tutu-react/ab-testing";

import { clientPageRoutes } from "../../interfaces/controllers/helpers/routes";
import { IRender }          from "../../interfaces/controllers/page/interfaces";

import createStore            from "./store";
import App                    from "./app";
import rootReducer            from "./app/reducers";
// import { createImageResizer } from "./app/sagas";

import { getConfig } from "./modules/config/selectors";

interface IPage {
  abTesting: {
    config: IConfig;
    instance: AbTesting;
  };
  location: string;
  is404?: boolean;
}

const render = ({ stats, dllAssets }): IRender => <T extends IPage>({ location, abTesting, ...state }: T) => {
  const { is404, ...preloadedState } = state,
    [store] = createStore(rootReducer, undefined, preloadedState);

  const appState = store.getState();

  // createImageResizer(appState);

  const config = getConfig(appState),
    cdn = config.getIn(["apiHosts", "cdn"]);

  if (cdn)
    __webpack_public_path__ = cdn;

  const sheets = new SheetsRegistry();

  const modules = new Set();
  let context = {};

  if (!abTesting) {
    console.error(`Undefined abTesting: (${JSON.stringify(location)})`);
  }

  const html = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.add(moduleName)}>
      <AbTestingProvider value={abTesting.instance}>
        <RootProvider registry={sheets}>
          <Provider store={store}>
            <StaticRouter location={location} context={context}>
              <App/>
            </StaticRouter>
          </Provider>
        </RootProvider>
      </AbTestingProvider>
    </Loadable.Capture>
  );
  const helmet = Helmet.renderStatic();
  const serverSideStyles = csso.minify(sheets.toString()).css;

  const { css = [], js = [] } = getBundles(stats, [...stats.entrypoints, ...Array.from(modules)]),
    jsException = [] as any[];

  const styles = [
    ...css
      .map(style => `<link href="${__webpack_public_path__}${style.file}" rel="stylesheet"/>`)
  ]
    .join("\n");

  const scripts = [
    `<script src="${__webpack_public_path__}${dllAssets.vendorsDll.js}"></script>`,
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
    routes: serialize(clientPageRoutes, { isJSON: true }),
    abTesting: serialize({
      config: { ...abTesting.config, serverRendering: false },
      campaigns: abTesting.instance.getCampaignsData()
    })
  };
};

export default render;
