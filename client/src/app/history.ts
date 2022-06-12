// history.js
import { createBrowserHistory, History } from "history";

export interface IHistoryLocationState {
    is404?: boolean
}

export const setHistoryState = (state: IHistoryLocationState) => {
    const location = history.location;
    const prevState = location.state ? location.state as IHistoryLocationState : {};

    history.replace(location.pathname, {
        ...prevState,
        ...state
    });
}

export const history = typeof window !== "undefined" ? createBrowserHistory() : {} as History;
export default history;
