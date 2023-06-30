import crypto from "crypto";

// 计算签名需要的参数
interface SignParams {
  app_secret: string;
  access_token: string;
  app_key: string;
  method: string;
  /** request body JSON */
  param_json: string;
  timestamp: string;
  /** API协议版本，固定值：2.0 */
  v: string;
}

export const getSign = (params: SignParams) => {
  const { app_secret, access_token, app_key, method, param_json, timestamp, v } = params;
  const contentStr = `${app_secret}access_token${access_token}app_key${app_key}method${method}param_json${param_json}timestamp${timestamp}v${v}${app_secret}`;
  return encodeURI(crypto.createHash("md5").update(contentStr).digest("hex"));
};
