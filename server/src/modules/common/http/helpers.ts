import { HttpMetadata } from "./metadata";

export function generateUrl(routeUrlAlias: string, params?: Object) {
    return HttpMetadata.generateUrl(routeUrlAlias, params);
}  

export function getNamedRoutes() {
    return HttpMetadata.getNamedRoutes();
} 