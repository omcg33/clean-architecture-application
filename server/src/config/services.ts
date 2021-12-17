import { CONFIG } from "../consts/config";
import { ENV } from "../consts/env";

export default {
    [CONFIG.CATS_SERVICE]: process.env[ENV.CATS_SERVICE],
    [CONFIG.DOGS_SERVICE]: process.env[ENV.DOGS_SERVICE],
}