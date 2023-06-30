# 京东物流 JDL SDK For Node.js

京东物流服务端接口的 Node.js 版本封装，暴露出简单的方法函数供调用。(非官方)

## 安装

```bash
npm install jdl-sdk-node
```

## 使用

### 初始化

```js
// CommonJS
const { JDL } = require("jdl-sdk-node");
```

```js
// esModule
import { JDL } from "jdl-sdk-node";
```

```js
// 初始化
const jdl = new JDL({
  appKey: "your app key",
  appSecret: "your app secret",
  accessToken: "your access token",
  env: "prod" // 环境参数，可选 prod 、 test, 默认 prod, 测试环境使用 test
});

// 使用 获取运单号
jdl.preGetWaybillCodes([{ orderOrigin: 2, customerCode: "010K000001", sum: 2 }]).then(res => {
  console.log(res);
});
```

#### options

| 参数名称    | 值描述                                                                |
| ----------- | --------------------------------------------------------------------- |
| appSecret   | 应用的 appSecret，可从【控制台-应用管理-概览】中查看                  |
| accessToken | “ISV 应用”、“自研商家应用”传值：用户授权完成时平台分配的 access_token |
| appKey      | 应用的 appKey，可从【控制台-应用管理-概览】中查看                     |
| env         | 环境参数，可选 prod 、 test, 默认 prod, 测试环境使用 test             |

---

## 注意事项

京东物流要求
所有 API 的入参都是数组包裹的对象
否则报错 code 62

```js
// 错误示例 ❌
jdl.preGetWaybillCodes({ orderOrigin: 2, customerCode: "010K000001", sum: 2 }).then(res => {
  console.log(res);
});
```

```js
// 正确示例 ✅
jdl.preGetWaybillCodes([{ orderOrigin: 2, customerCode: "010K000001", sum: 2 }]).then(res => {
  console.log(res);
});
```

### 相关文档

- 联调指南 https://cloud.jdl.com/#/open-business-document/access-guide/267/53377
- 业务错误码说明 https://cloud.jdl.com/#/open-business-document/access-guide/267/54365
- API 平台错误码 https://cloud.jdl.com/#/open-business-document/access-guide/267/53215

## API

### 获取运单号

若入参传了「cargoes-货品信息」和「productsReq-产品信息」，则接口校验客户编码下的产品信息，校验通过后出参返回揽收时间范围、支持的产品、预计送达时间以及预估费用

preGetWaybillCodes(data: PreGetWaybillCodesRequest)

### 下单接口

commonCreateOrderV1(data: object)

### 订单修改

commonModifyOrderV1(data: object)

### 订单取消

commonCancelOrderV1(data: object)

### 订单状态查询

commonGetOrderStatusV1(data: object)

### 订单轨迹查询

commonGetOrderTraceV1(data: object)

### 获取运单实时位置

getWaybillGisTrackByWaybillCode(data: object)

### 查询运单预计送达时间

queryOrderInfoByCondition(data: object)

### 查询电子签名图片

querySignatureImage(data: object)

### 查询标价运费

queryFeeResultByBusinessNo(data: object)

### 实际费用查询

commonGetActualFeeInfoV1(data: object)

### 物流轨迹订阅

commonSubscribeTraceV1(data: object)

## 参考文档

- [京东物流开放平台](https://cloud.jdl.com/#/open-business-document/access-guide/267/53375)
