export type SSRender<P> = (paramsForEachRequest: P) => IRenderResult;

export interface IRenderResult {
    html: string;
    styles: string;
    scripts: string;
    preloadedState: string;
    pagesRoutes: string;
    apiRoutes: string;
  }