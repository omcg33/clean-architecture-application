import { PAGES_URL_ALIASES, API_URL_ALIASES_GET, API_URL_ALIASES_POST } from "../consts";

export type IRoute = {
    alias: PAGES_URL_ALIASES | API_URL_ALIASES_GET | API_URL_ALIASES_POST;
    template: string;
}
export * from './ssr';