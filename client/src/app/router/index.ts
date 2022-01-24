import { Router } from "router5";
export { createRouter } from "./createRouter";
export { createRoutes } from "./createRoutes";

let router: Router;
export { router };
export const setRouter = (routerOutside: Router) => router = routerOutside;