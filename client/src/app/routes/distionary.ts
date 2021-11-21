
export enum API_ROUTES_GET {
    PAGE_NOT_FOUND = "pageNotFound",
  
    PAGE_MAIN = "pageMain",
    PAGE_CATS_LIST = "pageCatsList",
    PAGE_DOGS_LIST = "pageDogsList"
  }
  
  export enum API_ROUTES_POST {
    POST = "post",
  }
  
  export enum API_ROUTES_PUT {
    PUT = "put"
  }

  export enum API_ROUTES_PATCH {
    PATCH = "patch"
  }
  
  export enum API_ROUTES_DELETE {
    CAT = "cat",
    DOG = "dog"
  }

export const apiRoutesGet: Record<API_ROUTES_GET, string> = {
    [API_ROUTES_GET.PAGE_NOT_FOUND]: "/api/pages/notFound",
  
    [API_ROUTES_GET.PAGE_MAIN]: "/api/pages/main",
    [API_ROUTES_GET.PAGE_CATS_LIST]: "/api/pages/cats",
    [API_ROUTES_GET.PAGE_DOGS_LIST]: "/api/pages/dogs",
  };
  
  export const apiRoutesPost: Record<API_ROUTES_POST, string> = {
    [API_ROUTES_POST.POST]: "/api/post",
  };
  
  export const apiRoutesPut: Record<API_ROUTES_PUT, string> = {
    [API_ROUTES_PUT.PUT]: "/api/put",
  };

  export const apiRoutesPatch: Record<API_ROUTES_PATCH, string> = {
    [API_ROUTES_PATCH.PATCH]: "/api/patch",
  };
  
  export const apiRoutesDelete: Record<API_ROUTES_DELETE, string> = {
    [API_ROUTES_DELETE.CAT]: "/api/cats/:id",
    [API_ROUTES_DELETE.DOG]: "/api/dogs/:id",
  };