import { HttpMetadata } from './metadata';

export function generateUrl(
  routeUrlAlias: string,
  params?: Record<string, string | number>,
) {
  return HttpMetadata.generateUrl(routeUrlAlias, params);
}

export function getNamedRoutes() {
  return HttpMetadata.getNamedRoutes();
}
