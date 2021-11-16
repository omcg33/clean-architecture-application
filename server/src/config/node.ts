import { CONFIG } from "../consts/config";
import { ENV } from "../consts/env";

export default {
    [CONFIG.NODE_TLS_REJECT_UNAUTHORIZED]: process.env[ENV.NODE_TLS_REJECT_UNAUTHORIZED] || 0,
}