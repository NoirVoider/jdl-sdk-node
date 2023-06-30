import { JDLAPI } from "@/api";
import { ENV } from "./enums";
import type {
  PreGetWaybillCodesParams,
  CheckPreOrderParams,
  CreateOrderParams,
  ModifyOrderParams,
  CancelOrderParams,
  GetOrderStatusParams,
  GetOrderTrackParams,
  GetWaybillGisTrackParams,
  GetWaybillEstimatedDeliveryTimeParams,
  SubscribeTraceParams,
  GetActualFeeInfoParams,
  GetWaybillPriceParams,
  GetWaybillSignatureImageParams
} from "./types";

export interface InitOptions {
  appKey: string;
  appSecret: string;
  accessToken: string;
  /** 环境: test | prod, default: prod */
  env?: ENV;
}

export class JDL {
  private api: JDLAPI;
  constructor(private readonly initOptions: InitOptions) {
    this.initOptions.env ??= ENV.PROD;
    this.api = new JDLAPI(initOptions);
  }

  /**
   * 下单预检
   * @description 下单前使用此接口来判断收、派地址是否属于京东物流的收派范围；若入参只传寄件和收件地址，接口仅校验收、派地址是否属于京东物流的收派范围，校验通过后出参返回揽收时间范围、支持的产品以及预计送达时间；若入参传了「cargoes-货品信息」和「productsReq-产品信息」，则接口校验客户编码下的产品信息，校验通过后出参返回揽收时间范围、支持的产品、预计送达时间以及预估费用
   * @method POST
   * @url /ecap/v1/orders/precheck
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/842
   */
  async commonCheckPreCreateOrderV1(data: CheckPreOrderParams[]) {
    const { body } = await this.api.commonCheckPreCreateOrderV1(data);
    return body;
  }

  /**
   * 获取运单号
   * @description 获取京东快递运单号，支持B2C、C2C以及C2B场景下提前获取运单号；该接口需要配合「下单接口」使用，才可以完成京东物流快递下单业务。备注：此接口获取到的运单号有效期为3个月，3个月后运单号作废，作废的运单号无法再下单，请按照业务计划合理的获取运单号，无须过多的获取运单号。
   * @method POST
   * @url /ecap/v1/orders/pregetwaybillcodes
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/1288
   */
  async preGetWaybillCodes(data: PreGetWaybillCodesParams[]) {
    const { body } = await this.api.preGetWaybillCodes(data);
    return body;
  }

  /**
   * 下单接口
   * @description 京东物流快递业务接单接口。该接口适用于京东快递B2C、C2B、C2C业务场景，支持预制条码下单。此接口融合了筛单接口能力，客户系统向京东物流下发订单，校验通过后，为订单分配运单号，客户初步获取时效、费用信息。同时，还可以下单时订阅物流轨迹，订阅后将推送此订单的轨迹信息。
   * @method POST
   * @url /ecap/v1/orders/create
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/841
   */
  async commonCreateOrderV1(data: CreateOrderParams[]) {
    const { body } = await this.api.commonCreateOrderV1(data);
    return body;
  }

  /**
   * 订单修改
   * @description
   * 通过此接口可以修改下单信息，例如修改收件人电话、收件地址、包裹数、产品或者增值服务等信息；
   * 此接口的「必填」字段是基础信息，用于查询订单，不能修改；非必填信息是可修改信息，需要修改或者新增信息时，给这些参数赋值，不需要修改参数不用传值；
   * 注意事项：
   * 1. 「productsReq—产品信息」不支持修改，如果有变动，需要重新传值；
   * 2. B2C业务不支持添加「增值服务-代收货款」；
   * 3. 此次请求的参数值会覆盖原订单的信息。修改订单信息涉及打印面单，修改成功后需重新打印面单，以保证面单信息准确
   * @method POST
   * @url /ecap/v1/orders/modify
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/845
   */
  async commonModifyOrderV1(data: ModifyOrderParams[]) {
    const { body } = await this.api.commonModifyOrderV1(data);
    return body;
  }

  /**
   * 订单取消
   * @description 下单后由于各种原因不寄件，则可调用此接口取消或者发起拦截，其中B2C、C2B订单支持发起取消及拦截，C2C订单只支持发起取消。
   * 业务场景：
   * 1. 快递员揽收前可以取消，取消后运单号不可重复使用；
   * 2. 揽收后取消则发起拦截，拦截成功后执行逆向流程
   * @method POST
   * @url /ecap/v1/orders/cancel
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/846
   */
  async commonCancelOrderV1(data: CancelOrderParams[]) {
    const { body } = await this.api.commonCancelOrderV1(data);
    return body;
  }

  /**
   * 订单状态查询
   * @description
   * 通过此接口可查询订单状态，订单状态是一级状态，与运单的物流信息中的环节「category」是一致的；
   * 只支持使用京东物流运单号或者京东物流订单号查询，查询方式如下：
   * 1. 下单来源是0时，查询请求中提供京东运单号或京东订单号，接口验证url参数中app_key与所请求运单号(订单号)的归属关系，系统只返回具有正确归属关系的运单路由信
   * 2. 下单来源是1时，查询请求中提供京东运单号或京东订单号，接口验证customerCode与所请求运单号(订单号)的归属关系，系统只返回具有正确归属关系的运单路由信
   * @method POST
   * @url /ecap/v1/orders/status/get
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/844
   */
  async commonGetOrderStatusV1(data: GetOrderStatusParams[]) {
    const { body } = await this.api.commonGetOrderStatusV1(data);
    return body;
  }

  /**
   * 订单轨迹查询
   * 使用此接口可查询京东物流运单的全称跟踪，返回运单的全部全程跟踪节点信息。此接口只支持使用京东物流运单号或者京东物流订单号查询。
   * 查询方式如下：
   * 1. 下单来源是0时，接口验证url参数中app_key与所请求运单号(订单号)的归属关系，系统只返回具有正确归属关系的运单物流信息；
   * 2. 下单来源是1或2时，接口验证customerCode与所请求运单号(订单号)的归属关系，系统只返回具有正确归属关系的运单物流信息
   * @method POST
   * @url /ecap/v1/orders/trace/query
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/1039
   */
  async commonGetOrderTraceV1(data: GetOrderTrackParams[]) {
    const { body } = await this.api.commonGetOrderTraceV1(data);
    return body;
  }

  /**
   * 获取运单实时位置
   * @description
   * 获取运单实时位置，接口返回采集时间的经纬度。
   * 支持的业务场景：
   * 1. 仅支持B2C运单实时位置的获取；
   * 2. 已完结的运单无法查询到位置信息；
   * 3. 揽收前查询不到运单的位置信息
   * @method POST
   * @url /ecap/v1/orders/waybillGisTrack
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/1243
   */
  async getWaybillGisTrackByWaybillCode(data: GetWaybillGisTrackParams[]) {
    const { body } = await this.api.getWaybillGisTrackByWaybillCode(data);
    return body;
  }

  /**
   * 查询运单预计送达时间
   * @description
   * 查询快递业务下，静态或者动态查询运单预计送达时间和扩展信息。
   * 1. B2C场景下，即orderorigin=1或2时，传入客户编码或收件人电话进行查询
   * 2. C2C场景下，即orderorigin=0时，传入运单号和收件人电话进行查询
   * @method POST
   * @url /ecap/v1/orders/info/query
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/1246
   */
  async queryOrderInfoByCondition(data: GetWaybillEstimatedDeliveryTimeParams[]) {
    const { body } = await this.api.queryOrderInfoByCondition(data);
    return body;
  }

  /**
   * 查询电子签名图片
   * @description 运单妥投后，调用此接口查询运单的电子签名图片。只支持B2C业务场景
   * @method POST
   * @url /ecap/v1/orders/signature/query
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/1245
   */
  async querySignatureImage(data: GetWaybillSignatureImageParams[]) {
    const { body } = await this.api.querySignatureImage(data);
    return body;
  }

  /**
   * 查询标价运费
   * @description
   * 基于当前的始发城市、目的城市和重量体积查询运单的标准价；若运单拒收后，可使用新单号查询新单的费用。
   * 支持的业务场景：
   * 1. 只支持B2C和C2B运单
   * 2. 只支持查询月结运单的费用
   * 3. 揽收完成后查询
   * @method POST
   * @url /ecap/v1/orders/standardfee/query
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/1338
   */
  async queryFeeResultByBusinessNo(data: GetWaybillPriceParams[]) {
    const { body } = await this.api.queryFeeResultByBusinessNo(data);
    return body;
  }

  /**
   * 实际费用查询
   * @description
   * 此接口支持现结和月结费用查询，可使用新单号查询新单的费用。
   * 查询方式如下：
   * 1. 下单来源是0时，接口验证url参数中app_key与所请求运单号(订单号)的归属关系，系统只返回具有正确归属关系的运单运费
   * 2. 下单来源是1或者2时，接口验证customerCode与所请求运单号(订单号)的归属关系，系统只返回具有正确归属关系的运单运费
   * 3. 可根据不同场景查询：快递员揽收完成后可查询揽收重量、体积及费用等相关信息；月结费用妥投后查询较为精准；费用相关类信息，以最终账单信息为准。
   * @method POST
   * @url /ecap/v1/orders/actualfee/query
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/843
   */
  async commonGetActualFeeInfoV1(data: GetActualFeeInfoParams[]) {
    const { body } = await this.api.commonGetActualFeeInfoV1(data);
    return body;
  }

  /**
   * 物流轨迹订阅
   * @description
   * 商家接收京东物流主动推送的运单物流信息，需要先通过此接口进行订阅，订阅成功后，若运单产生物流信息，则通过推送接口回调商家在开放平台配置的回调接口，完成推送(下单接口的extendProps也支持下单即订阅)
   * 仅支持单个运单的订阅
   * 1. orderOrigin=0时，会验证app_key与运单号(订单号)的归属关系，并校验收件人手机号后四位与下单时的数据是否一致；
   * 2. orderOrigin=1时，会验证customerCode与运单号(订单号)的归属关系，并校验收件人手机号后四位与下单时的数据是否一致
   * @method POST
   * @url /ecap/v1/orders/trace/subscribe
   * @doc https://cloud.jdl.com/#/open-business-document/api-doc/267/1038
   */
  async commonSubscribeTraceV1(data: SubscribeTraceParams[]) {
    const { body } = await this.api.commonSubscribeTraceV1(data);
    return body;
  }
}
