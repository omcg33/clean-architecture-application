import createRouter5, { Route, RouteNode } from "router5";
import loggerPlugin from "router5-plugin-logger";
import browserPlugin from "router5-plugin-browser";

import { onRouteMiddleware } from "./middlewares";

export const createRouter = (routes: Route[] | RouteNode) => {
  const router = createRouter5(routes, {
    allowNotFound: true
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
