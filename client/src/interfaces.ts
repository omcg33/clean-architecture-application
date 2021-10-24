import { Map } from "immutable";


// TODO: вложенность объектов
export interface ImmutableMap<T> extends Map<string, any> {
  get<K extends keyof T>(name: K, notSetValue?: any): T[K];
}

// export type IImmutableDateInterval = ImmutableMap<IDateInterval>
