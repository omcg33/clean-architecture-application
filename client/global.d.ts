///<reference types="node" />
declare type IRoute = import("./src/app/interfaces").IRoute;
// import { IRoute } from "./src/app/interfaces";

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
  __ROUTES__: IRoute[];
}

//variables
declare var  __webpack_public_path__: string;
