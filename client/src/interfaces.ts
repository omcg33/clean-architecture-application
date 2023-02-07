import { Axios } from "axios";
import { Map } from "immutable";

// TODO: вложенность объектов
export interface ImmutableMap<T> extends Map<string, any> {
  get<K extends keyof T>(name: K, notSetValue?: any): T[K];
}

// TODO: заменить на общий интерфейс
export type IHttpClient = Axios;

// export type IImmutableDateInterval = ImmutableMap<IDateInterval>
