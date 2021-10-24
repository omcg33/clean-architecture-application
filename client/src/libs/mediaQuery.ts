import theme   from "@tutu/order-theme";
import Browser from "@tutu-utils/browser-detect";

export function getMatchQuery(query) {
  return Browser.check() && window ? window.matchMedia(query) : null;
}

export function isMediaQueryMinWidth(minWidth) {
  const matchQuery = getMatchQuery(`(min-width: ${minWidth}px)`);

  return matchQuery || null;
}

export function desktopMediaQueryListerner(callback) {
  setMatches(callback);

  window.addEventListener("resize", () => {
    setMatches(callback);
  });
}

function setMatches(cb) {
  const mediaQuery = isMediaQueryMinWidth(theme.variables.gridBreakpoints.lg);

  if (mediaQuery === null)
    return;

  cb(mediaQuery.matches);
}

export function getBreakpointFromMedia(): string {
  if (!Browser.check())
    return "";

  if (isMediaQueryMinWidth(theme.variables.gridBreakpoints.xl))
    return "XL";
  if (isMediaQueryMinWidth(theme.variables.gridBreakpoints.lg))
    return "LG";
  if (isMediaQueryMinWidth(theme.variables.gridBreakpoints.md))
    return "MD";
  if (isMediaQueryMinWidth(theme.variables.gridBreakpoints.sm))
    return "SM";

  return "XS";
}
