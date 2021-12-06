import { NAMED_ROUTES } from "@src/modules/common/http";
import { API_ROUTES, API_URL_ALIASES_GET, API_URL_ALIASES_POST, API_URL_ALIASES_PATCH, API_URL_ALIASES_PUT, API_URL_ALIASES_DELETE } from "../../../common";


// TODO: типизация
export const filterApiRoutes = (routes: NAMED_ROUTES): API_ROUTES => {
    const output: any = {
        GET: {},
        POST: {},
        PATCH: {},
        PUT: {},
        DELETE: {},
    };

    return Object.entries(routes).reduce((apiRoutes, [routeAlias, route]) => {

        if (Object.values(API_URL_ALIASES_GET).includes(routeAlias as any)) {
            apiRoutes["GET"][routeAlias] = route;
        }

        if (Object.values(API_URL_ALIASES_POST).includes(routeAlias as any)) {
            apiRoutes["POST"][routeAlias] = route;
        }

        if (Object.values(API_URL_ALIASES_PATCH).includes(routeAlias as any)) {
            apiRoutes["PATCH"][routeAlias] = route;
        }

        if (Object.values(API_URL_ALIASES_PUT).includes(routeAlias as any)) {
            apiRoutes["PUT"][routeAlias] = route;
        }

        if (Object.values(API_URL_ALIASES_DELETE).includes(routeAlias as any)) {
            apiRoutes["DELETE"][routeAlias] = route;
        }

        return apiRoutes;
    }, output)
}

// export const convertRoutesObjectToRoutesArray = (routes: Record<string, string>):IRoute[] => {
//     return Object.entries(routes).reduce((acc, [routeAlias, routeValue]) => {
//         acc.push({alias: routeAlias, template: routeValue});
//         return acc;
//     }, []);
// }