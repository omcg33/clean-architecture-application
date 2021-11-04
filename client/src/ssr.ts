import "regenerator-runtime/runtime.js";
import Loadable                 from "react-loadable";

import { createSSRender }       from "./serverEntrypoint";
import stats                    from "../dist/reactLoadable.json";

export default async () => {
    await Loadable.preloadAll();
    return createSSRender({ stats });
};