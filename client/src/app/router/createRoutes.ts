import { PAGES_ROUTES } from "../../../../common/dist";

export const createRoutes = (pageRoutes:PAGES_ROUTES) => pageRoutes.map(route => ({
    name: route.alias, 
    path: route.template,
    onActivate: (params) => { console.log('qwe', params); return { type: "CUSTOM" } }
}));
