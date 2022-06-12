import axios              from "axios";
import param              from "jquery-param";

const isOuter = (url: string): boolean => /^https?:\/\//i.test(url);

let axiosClient: any;


export function setAxiosClient(axios: any) {
  axiosClient = axios;
}

function getAxiosClient() {
  if (axiosClient) {
    return axiosClient;
  } else {
    return axios;
  }
}


function ajax(url: string, method: string = "get", data: Object = {}, prefix: string = "", axiosDefaults: Object = {
  paramsSerializer: param
}, rest?: Object) {
  return new Promise((res, rej) => {
    const reqObj: any = {
      url: `${isOuter(url) ? "" : prefix}${url}`,
      method,
      ...axiosDefaults
    };
    /**
     * Methods "post" and "put" of axios have 3 args, 2nd is data to send.
     * Yet "get" and "delete" have 2 args, 2nd is "config".
     * Query params should be passed as "config.params".
     * @see https://github.com/mzabriskie/axios#instance-methods
     */
    if (method === "get" || method === "delete") {
      reqObj.params = data;
    } else {
      reqObj.data = data;
    }

    getAxiosClient()({...reqObj, ...rest}).then(
      // Process normally
      ({ data }: any) => {
        // if (data.redirect) return res(redirectToPage(data.redirect));
        if (data.error) return rej(data.error);

        return res(data);
      },
      // Process request error
      (result: any) => rej(result)
    );
  });
}

export function post(
  url: string,
  data?: any,
  prefix?: string,
  axiosDefaults?: any,
  rest?: Object
): any {
  return ajax(url, "post", data, prefix, axiosDefaults, rest);
}

export function get(
  url: string,
  data?: any,
  prefix?: string,
  axiosDefaults?: any
) {
  return ajax(url, "get", data, prefix, axiosDefaults);
}

export function put(
  url: string,
  data?: any,
  prefix?: string,
  axiosDefaults?: any
) {
  return ajax(url, "put", data, prefix, axiosDefaults);
}

export function del(
  url: string,
  data?: any,
  prefix?: string,
  axiosDefaults?: any
) {
  return ajax(url, "delete", data, prefix, axiosDefaults);
}

export function patch(
  url: string,
  data?: any,
  prefix?: string,
  axiosDefaults?: any
) {
  return ajax(url, "patch", data, prefix, axiosDefaults);
}
