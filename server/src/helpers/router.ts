import { NAMED_ROUTES } from "@src/modules/common/http";
import { API_URL_ALIASES_GET, API_URL_ALIASES_POST, IRoute } from "../../../common";

type API_ROUTES = Record<API_URL_ALIASES_GET | API_URL_ALIASES_POST, string>;

const API_ROUTES_ALIASES = [
    ...Object.values(API_URL_ALIASES_GET),
];

// TODO: типизация
export const filterApiRoutes = (routes: NAMED_ROUTES):API_ROUTES => {
    return Object.entries(routes).reduce((apiRoute, [routeAlias, route]) => {
        if (API_ROUTES_ALIASES.includes(routeAlias as any)) {
            apiRoute[routeAlias] = route;
        }

        return apiRoute;
    }, {} as any)
}

export const convertRoutesObjectToRoutesArray = (routes: Record<string, string>):IRoute[] => {
    return Object.entries(routes).reduce((acc, [routeAlias, routeValue]) => {
        acc.push({alias: routeAlias, template: routeValue});
        return acc;
    }, []);
}