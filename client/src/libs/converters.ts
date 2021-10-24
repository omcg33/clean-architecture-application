// import { Map } from "immutable";
//
//
// interface ISelectData<T> {
//   label: string;
//   value: T;
//   hint?: string
// }
//
// export interface IImmutableSelectData<T> extends Map<"label" | "hint" | "value", string | string | T> {
//   get<K extends keyof ISelectData<T>>(key: K): ISelectData<T>[K];
// }

//TODO: ПРеобразуем данные к 1 формату, для простоты использования VIEW (оно использует интерфейс ISelectData)
// export const locationToSelectData = (location): IImmutableSelectData<number> => Map<"label" | "value", string | number>()
//   .set("label", location.get("name"))
//   .set("value", location.get("id"));
