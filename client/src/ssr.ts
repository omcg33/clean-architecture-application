import "regenerator-runtime/runtime.js";
import Loadable                 from "react-loadable";

import { render, IRenderParams }       from "./serverEntrypoint";
import stats                    from "../dist/reactLoadable.json";

export const createRender = async (params: Pick<IRenderParams, 'assetsPath'>) => {
    const { assetsPath } = params;
    await Loadable.preloadAll();

    return (renderParams: Omit<IRenderParams, 'assetsPath' | 'stats'>) => render({...renderParams, stats, assetsPath})
}