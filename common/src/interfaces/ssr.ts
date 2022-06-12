export type CreateSSRender<CP, RP> = (createParams: CP) => SSRender<RP>;
export type SSRender<P> = <T extends P>(paramsForEachRequest: T) => IRenderResult;
export interface IRenderResult {
    html: string;
    styles: string;
    scripts: string;
    preloadedState: string;
    pagesRoutes: string;
    apiRoutes: string;
  }