import * as pathToRegexp from "path-to-regexp";

import { PAGES_URL_ALIASES, API_ROUTES, PAGES_ROUTES, API_URL_ALIASES_GET, API_URL_ALIASES_POST, API_URL_ALIASES_PATCH, API_URL_ALIASES_PUT, API_URL_ALIASES_DELETE } from "../../../../common/dist";

interface IOptions {
    params?: Object;
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
}

export let pagesRoutes: PAGES_ROUTES = [];
let pageRoutesObject: Record<PAGES_URL_ALIASES, string>;

let apiRoutesObject: API_ROUTES = {} as any;

export const getIs404 = (meta: any):boolean => {
    const { is404 = false } = meta.options || {};

    return is404;
};

export const setPageRoutes = (routes: PAGES_ROUTES) => {
    pagesRoutes = routes.map(route => ({ ...route, template: route.template.replace("(?:*)", "(.*)") }));
    pageRoutesObject = pagesRoutes.reduce<Record<PAGES_URL_ALIASES, string>>((acc, route) => ({ ...acc, [route.alias]: route.template }), {} as any);
};

export const setApiRoutes = (routes: API_ROUTES) => {
    apiRoutesObject = routes;
};

export const generatePageUrl = (alias, params = {}) => {
    if (!Object.keys(pageRoutesObject).includes(alias))
        throw new ReferenceError(`Неизвестный алиас для роута страницы ${alias}`);

    try {
        return pathToRegexp.compile(pageRoutesObject[alias])(params);
    } catch (e) {
        console.error(e);
        throw new Error(e as string);
    }
};

export const generateApiUrl = (
    alias: API_URL_ALIASES_GET | API_URL_ALIASES_POST | API_URL_ALIASES_PATCH | API_URL_ALIASES_PUT | API_URL_ALIASES_DELETE,
    options?: IOptions
) => {
    const { params = {}, method = "GET" } = options || {};

    if (!Object.keys(apiRoutesObject[method]).includes(alias))
        throw new ReferenceError(`Неизвестный алиас для api роута страницы ${alias}`);

    try {
        return pathToRegexp.compile(apiRoutesObject[method][alias])(params);
    } catch (e) {
        console.error(e);
        throw new Error(e as string);
    }
};