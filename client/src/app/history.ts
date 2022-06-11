// history.js
import { createBrowserHistory, History } from "history";

export const history = typeof window !== "undefined" ? createBrowserHistory() : {} as History;

// configure, createTrip, and export the project's history instance
export default history;
