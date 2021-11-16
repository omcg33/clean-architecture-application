import { ENV } from "./env";

export const CONFIG = {    
    NODE_TLS_REJECT_UNAUTHORIZED: ENV.NODE_TLS_REJECT_UNAUTHORIZED,

    HOST: ENV.HOST,
    PORT: ENV.PORT,
    BASE_PATH: ENV.BASE_PATH,

} as const;