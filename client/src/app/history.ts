// history.js
import { createBrowserHistory, History } from "history";

const isBrowser = typeof window !== 'undefined';

const history = isBrowser ? createBrowserHistory<{is404?: boolean}>() : {} as History<{is404?: boolean}>;

// configure, createTrip, and export the project's history instance
export default history;
