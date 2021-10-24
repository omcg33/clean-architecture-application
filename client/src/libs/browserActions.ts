import theme   from "@tutu/order-theme";
import Browser from "@tutu-utils/browser-detect";

import history from "../app/history";


export function getDocument() {
  return (Browser.check() && document) || (<any>{});
}


export function getWindow() {
  return (Browser.check() && window) || (<any>global) || (<any>{});
}


export function setToWindow(prop: string, value: any) {
  return getWindow()[prop] = value;
}


export function getFromWindow(prop: string, def: any) {
  return getWindow()[prop] || def;
}


export function stopPropagationBrowserHistory(from: string) {
  const w = getWindow();
  const { referrer } = getDocument();

  if (referrer && referrer.replace(w.location.origin, "") === from) {
    w.history && w.history.pushState(null, "", w.location.href);
    w.onpopstate = function() {
      w.history.go(1);
    };
  }
}


export function redirectToPage(url: string) {
  // return getWindow().location.replace(url);
  return history.push({pathname: url});
}


export function reload() {
  return getWindow().location.reload();
}


export function setToStorage(key: string, value: any) {
  return getWindow().localStorage[key] = value;
}

export function getFromStorage(key: string) {
  return getWindow().localStorage[key];
}

export function removeFromStorage(key: string) {
  const { localStorage } = getWindow();
  return delete localStorage[key];
}

export function getMatchQuery(query: string) {
  return Browser.check() ? window.matchMedia(query) : null;
}

export function isMediaQueryMinWidth(minWidth: number) {
  const matchQuery = getMatchQuery(`(min-width: ${minWidth}px)`);

  return matchQuery || null;
}

export function isDesktop(): boolean {
  const matchQuery = isMediaQueryMinWidth(theme.variables.gridBreakpoints.lg);

  return matchQuery ? matchQuery.matches : false;
}


export default {};
