import "regenerator-runtime/runtime.js";
import Loadable                 from "react-loadable";
// import { REACT_LOADABLE_STATS } from "../config/consts";
import { createSSRender }       from "./serverEntrypoint";
import stats from "../dist/reactLoadable.json";
// const stats = require(REACT_LOADABLE_STATS);

export default async () => {
    await Loadable.preloadAll();
    return createSSRender({ stats });
};