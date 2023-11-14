///<reference types="node" />
declare type PAGES_ROUTES = import("../common/src").PAGES_ROUTES;
declare type API_ROUTES = import("../common/src").API_ROUTES;


interface IStyles {
  readonly [id: string]: string;
}

declare module "*.css" {
  const content: Readonly<IStyles>;
  export = content;
}

declare module "*.less" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: string;
  export = content;
}

declare module "*.jpg" {
  const content: string;
  export = content;
}

declare module "*.svg" {
  const content: string;
  export = content;
}

declare module "*.ico" {
  const content: string;
  export = content;
}

declare module "*.json" {
  const content: any;
  export default content;
}

declare module NodeJS  {
  interface Global {
    config: any
  }
}

interface Window {
  __PRELOADED_STATE__: any;
  __PAGES_ROUTES__: PAGES_ROUTES;
  __API_ROUTES__: API_ROUTES;

  __SAGA_MONITOR_EXTENSION__?: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

//variables
declare var  __webpack_public_path__: string;
