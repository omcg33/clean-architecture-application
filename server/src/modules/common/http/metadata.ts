import { join } from 'path';

export type NAMED_ROUTES = Record<string, string>;

export class HttpMetadata {
  static store: Record<'routes', NAMED_ROUTES> = { routes: {} };

  static addNamedRoute(routeName: string, path: string): void {
    HttpMetadata.store.routes[routeName] = path;
  }
  static getNamedRoutes() {
    return HttpMetadata.store.routes;
  }

  static generateUrl(routeName: string, params: Object = {}): string {
    const routeTemplate = HttpMetadata.store.routes[routeName];

    if (!routeTemplate) return null;

    const [route, queryParams] = Object.entries(params).reduce(
      (acc, [paramKey, paramValue]) => {
        if (acc[0].includes(`:${paramKey}`))
          acc[0] = acc[0].replace(`:${paramKey}`, paramValue)
        else 
          acc[1][paramKey] = paramValue;

        return acc;
      },
      [routeTemplate, {}]
    )

    const searchParams = new URLSearchParams(queryParams).toString();

    return join(route, searchParams ? `?${searchParams}` : '');
  }

}