import { List, Range } from "immutable";
import toInteger       from "lodash-es/toInteger";

const nativeMax = Math.max;

export const chunk = <T>(list, size = 1): List<List<T> | undefined> => {
  size = nativeMax(toInteger(size), 0);

  const count = list == null ? 0 : list.count;

  if (!count || size < 1) {
    return List();
  }

  return Range(0, list.count(), size)
    .map(start => list.slice(start, start + size))
    .toList();
};
