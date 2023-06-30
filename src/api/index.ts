import { generateRequest } from "@/utils/http";
import { InitOptions } from "..";

export class JDLAPI {
  private request: ReturnType<typeof generateRequest>;
  constructor(params: InitOptions) {
    this.request = generateRequest(params);
  }

  /** 下单前置校验 */
  commonCheckPreCreateOrderV1(data: object) {
    return this.request.post("/ecap/v1/orders/precheck", data);
  }

  /** 获取运单号 */
  preGetWaybillCodes(data: object) {
    return this.request.post("/ecap/v1/orders/pregetwaybillcodes", data);
  }

  /** 下单接口 */
  commonCreateOrderV1(data: object) {
    return this.request.post("/ecap/v1/orders/create", data);
  }

  /** 订单修改 */
  commonModifyOrderV1(data: object) {
    return this.request.post("/ecap/v1/orders/modify", data);
  }

  /** 订单取消 */
  commonCancelOrderV1(data: object) {
    return this.request.post("/ecap/v1/orders/cancel", data);
  }

  /** 订单状态查询 */
  commonGetOrderStatusV1(data: object) {
    return this.request.post("/ecap/v1/orders/status/get", data);
  }

  /** 订单轨迹查询 */
  commonGetOrderTraceV1(data: object) {
    return this.request.post("/ecap/v1/orders/trace/query", data);
  }

  /** 获取运单实时位置 */
  getWaybillGisTrackByWaybillCode(data: object) {
    return this.request.post("/ecap/v1/orders/waybillGisTrack", data);
  }

  /** 查询运单预计送达时间 */
  queryOrderInfoByCondition(data: object) {
    return this.request.post("/ecap/v1/orders/info/query", data);
  }

  /** 查询电子签名图片 */
  querySignatureImage(data: object) {
    return this.request.post("/ecap/v1/orders/signature/query", data);
  }

  /** 查询标价运费 */
  queryFeeResultByBusinessNo(data: object) {
    return this.request.post("/ecap/v1/orders/standardfee/query", data);
  }

  /** 实际费用查询 */
  commonGetActualFeeInfoV1(data: object) {
    return this.request.post("/ecap/v1/orders/actualfee/query", data);
  }

  /** 物流轨迹订阅 */
  commonSubscribeTraceV1(data: object) {
    return this.request.post("/ecap/v1/orders/trace/subscribe", data);
  }
}
