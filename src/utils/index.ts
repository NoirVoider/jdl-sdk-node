// 处理url拼接可能 / 问题
export const buildAPIUrl = (baseURL: string, api: string) => {
  const isStart = baseURL.substring(baseURL.length - 1) === "/";
  const isEnd = api.substring(0, 1) === "/";
  if (isStart && isEnd) return `${baseURL}${api.substring(1)}`;
  if (isStart || isEnd) return `${baseURL}${api}`;
  return `${baseURL}/${api}`;
};

// 处理对象转换为url参数
export const qsStringify = (obj: Record<string, unknown>) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key, index) => {
    const value = obj[key];
    const prefix = index === 0 ? "" : "&";
    return `${acc}${prefix}${key}=${value}`;
  }, "");
};
