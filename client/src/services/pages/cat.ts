import { IHttpClient } from "../../interfaces";

export class CatPageService {
    constructor(
        private _url: string,
        private _httpClient: IHttpClient
    ) {}

    get(params) {
        return this._httpClient.get(this._url, params)
    }
}