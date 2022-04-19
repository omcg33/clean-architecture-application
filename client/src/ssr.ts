import "regenerator-runtime/runtime.js";
import Loadable                 from "react-loadable";

import { createSSRender }       from "./serverEntrypoint";
import stats                    from "../dist/reactLoadable.json";

const createSSRenderWithPreload = async ({ assetsPath }: { assetsPath: string }) => {
    await Loadable.preloadAll();
    return createSSRender({ stats, assetsPath });
};

export {
    createSSRenderWithPreload as createSSRender
}