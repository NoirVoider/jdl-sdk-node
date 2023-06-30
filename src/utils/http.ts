import p from "phin";
import { ENV } from "@/enums";
import { buildAPIUrl, qsStringify } from ".";
import { InitOptions } from "..";
import dayjs from "dayjs";
import { getSign } from "./getSign";

const HOST = {
  [ENV.TEST]: "https://uat-api.jdl.com",
  [ENV.PROD]: "https://api.jdl.com"
};

enum METHODS {
  GET = "GET",
  POST = "POST"
}

interface requestConfig {
  headers?: Record<string, string>;
  method?: METHODS;
}

const buildURL = (url: string, data: object, config: InitOptions): string => {
  const params = {
    app_key: config.appKey,
    access_token: config.accessToken,
    timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    v: "2.0",
    "LOP-DN": "ECAP"
  };

  const queryStr = qsStringify({
    ...params,
    sign: getSign({
      ...params,
      app_secret: config.appSecret,
      method: url,
      param_json: JSON.stringify(data)
    })
  });

  return `${url}?${queryStr}`;
};

export const generateRequest = (createOptions: InitOptions) => {
  const baseURL = HOST[createOptions.env || ENV.PROD];

  const request = async <T = unknown>(url: string, data: object, config: requestConfig) => {
    const { method } = config || {};
    return p<T>({ url: buildAPIUrl(baseURL, url), data, method, parse: "json", ...config });
  };

  const [get, post] = (["GET", "POST"] as METHODS[]).map(method => {
    return async <T = unknown>(url: string, data: object) => {
      return request<T>(buildURL(url, data, createOptions), data, { method });
    };
  });

  return { post, get };
};
