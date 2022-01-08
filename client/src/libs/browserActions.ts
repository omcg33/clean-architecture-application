// import history from "../app/history";

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

export function getDocument() {
  return (isBrowser) || (<any>{});
}


export function getWindow() {
  return (isBrowser) || (<any>global) || (<any>{});
}


export function setToWindow(prop: string, value: any) {
  return getWindow()[prop] = value;
}


export function getFromWindow(prop: string, def: any) {
  return getWindow()[prop] || def;
}


// export function stopPropagationBrowserHistory(from: string) {
//   const w = getWindow();
//   const { referrer } = getDocument();

//   if (referrer && referrer.replace(w.location.origin, "") === from) {
//     w.history && w.history.pushState(null, "", w.location.href);
//     w.onpopstate = function() {
//       w.history.go(1);
//     };
//   }
// }


// export function redirectToPage(url: string) {
//   return history.push({pathname: url});
// }


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
  return isBrowser ? window.matchMedia(query) : null;
}

export function isMediaQueryMinWidth(minWidth: number) {
  const matchQuery = getMatchQuery(`(min-width: ${minWidth}px)`);

  return matchQuery || null;
}

export function isDesktop(): boolean {
  const matchQuery = isMediaQueryMinWidth(1024);

  return matchQuery ? matchQuery.matches : false;
}