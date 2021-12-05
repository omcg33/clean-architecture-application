import { CONFIG } from "../consts/config";
import { ENV } from "../consts/env";

export default {
    [CONFIG.HOST]: process.env[ENV.HOST],
    [CONFIG.PORT]: process.env[ENV.PORT],   
    [CONFIG.BASE_PATH]: process.env[ENV.BASE_PATH] || '/',
}