import { REACT_LOADABLE_STATS } from "../config/consts";
import { createSSRender }    from "./serverEntrypoint";

const stats = require(REACT_LOADABLE_STATS);

export const render = createSSRender({ stats });