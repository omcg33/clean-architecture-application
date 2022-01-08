import createRouter5 from "router5";
import loggerPlugin from "router5-plugin-logger";
import browserPlugin from "router5-plugin-browser";

import { PAGES_URL_ALIASES } from "../../../../common";
import { onRouteMiddleware } from "./middlewares";

export const createRouter = (routes, defaultRoute: PAGES_URL_ALIASES) => {
  const router = createRouter5(routes, {
    defaultRoute
  });
  router.usePlugin(loggerPlugin);
  router.usePlugin(
    browserPlugin({
      useHash: false
    })
  );
  router.useMiddleware(onRouteMiddleware(routes))

  return router;
};
