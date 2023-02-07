import { List, Range, Seq } from "immutable";
import toInteger                 from "lodash-es/toInteger";
import { ImmutableMap }          from "../interfaces";

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


// https://github.com/immutable-js/immutable-js/wiki/Converting-from-JS-objects#custom-conversion
// https://stackoverflow.com/a/40663730
export const fromJS = (js) => {
  return typeof js !== 'object' || js === null ? js :
    Array.isArray(js)
      ? Seq(js).map(fromJS).toList()
      : Seq(js).map(fromJS).toMap();
};

export const createNestedList = (list: List<ImmutableMap<{id: number; parentId: number | null}>>) => {
  // Create root for top-level node(s)
  const root = [] as any[];
// Cache found parent index
  const map = {};
  const flat: any[] = list.toJS();


  // Используем мутацию и присваивание по ссылке для прохода 1 раз по массиву
  flat.forEach((node: any) => {
    // No parentId means top level
    if (!node.parentId) return root.push(node);

    // Insert node as child of parent in flat array
    let parentIndex = map[node.parentId];
    if (typeof parentIndex !== "number") {
      parentIndex = flat.findIndex((el: any) => el.id === node.parentId);
      map[node.parentId] = parentIndex;
    }

    if (parentIndex === -1 )
      return;

    if (!flat[parentIndex].children) {
      return flat[parentIndex].children = [node];
    }

    flat[parentIndex].children.push(node);

    return;
  });

  return fromJS(root);
};
