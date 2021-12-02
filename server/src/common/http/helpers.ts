import { HttpMetadata } from "./metadata";

export function route(name: string, params?: Object): string {
    return HttpMetadata.getRoute(name, params);
}  