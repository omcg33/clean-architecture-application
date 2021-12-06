import { PAGES_URL_ALIASES, API_URL_ALIASES_GET, API_URL_ALIASES_POST, API_URL_ALIASES_DELETE, API_URL_ALIASES_PATCH, API_URL_ALIASES_PUT } from "../consts";

export type PAGES_ROUTES = {
    alias: PAGES_URL_ALIASES;
    template: string;
}[];

export type API_ROUTES = {
    GET: Record<API_URL_ALIASES_GET, string>,
    POST: Record<API_URL_ALIASES_POST, string>,
    PATCH: Record<API_URL_ALIASES_PATCH, string>,
    PUT: Record<API_URL_ALIASES_PUT, string>,
    DELETE: Record<API_URL_ALIASES_DELETE, string>,
};

export * from './ssr';