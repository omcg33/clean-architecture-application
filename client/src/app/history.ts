// history.js
import { createBrowserHistory, History } from "history";

const isBrowser = typeof window !== 'undefined';

const history = isBrowser ? createBrowserHistory() : {} as History;

// configure, createTrip, and export the project's history instance
export default history;
