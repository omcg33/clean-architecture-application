// history.js
import { createBrowserHistory, History } from "history";

import Browser from "@tutu-utils/browser-detect";

const history = Browser.check() ? createBrowserHistory() : {} as History;

// configure, createTrip, and export the project's history instance
export default history;
