import { ORDER_ORIGIN } from "../enums";

interface CommonParams {
  /** 客户编码，长度1-32；orderOrigin为 1 或者2时必填；与下单时使用的客户编码保持一致 */
  customerCode?: string;
  /** 寄件人手机号码；长度11个字符，超出字段长度报错；最多仅支持传入1个手机号 */
  mobile?: string;
}

export interface CommonProductInfo {
  /** productCode-主产品信息 https://cloud.jdl.com/#/open-business-document/access-guide/267/54153 */
  productCode?: string;
  /** productAttrs-主产品属性 https://cloud.jdl.com/#/open-business-document/access-guide/267/54154 */
  productAttrs?: {
    key: string;
    value: string;
  }[];
  addedProducts?: {
    productCode?: string;
    productAttrs?: {
      key: string;
      value: string;
    }[];
  }[];
}

// 订单预检查 获取预估运费等
export interface CheckPreOrderParams {
  /** 寄件人信息 */
  senderContact: {
    /** 寄件全地址；长度1-200字符，超出字段长度报错；必须包含省市 */
    fullAddress: string;
    /** 寄件人姓名；长度1-50，超出报错；不支持生僻字及emjio */
    name?: string;
    /** 寄件人手机号码；长度11个字符，超出字段长度报错；最多仅支持传入1个手机号 */
    mobile?: CommonParams["mobile"];
    /** 发货仓编码；长度1-50字符，用于匹配揽收站点，入参传入此信息时，优先以此获取揽收站点，本信息可通过销售或销售支持获取 */
    warehouseCode?: string;
  };
  /** 收件人信息 */
  receiverContact: {
    /**
     *  收件全量四级地址；长度1-200，超出字段长度报错；必须包含省市
     *  @example "江苏省常州市新北区三井街道太湖明珠苑27-12号"
     */
    fullAddress: string;
    /** 收件人姓名；长度1-50，超出报错；不支持生僻字及emjio */
    name?: string;
    /** 收件人手机号码；长度11个字符，超出字段长度报错；最多仅支持传入1个手机号 */
    mobile?: string;
  };
  /** 下单来源：0-c2c；1-b2c；2-c2b； */
  orderOrigin: ORDER_ORIGIN;
  /** 客户编码，长度1-32；orderOrigin为 1 或者2 时必填，与京东物流签约后生成 */
  customerCode?: string;
  /** 货品信息，寄递货物的基础信息，包括重量体积以及包裹的长宽高等；入参只能传一个货品对象，不支持输入多个货品 */
  cargoes?: {
    /** 拖寄物描述 */
    name?: string;
    /** 数量，长度1-8，未填默认补1 */
    quantity?: number;
    /** 重量，长度1-8；单位：kg，保留小数点后两位，必须大于0； */
    weight?: number;
    /** 体积, 单位：cm3，保留小数点后两位，必须大于0 */
    volume?: number;
    /** 长度，长度1-8，单位：cm，未填默认补0 ；保留小数点后两位 */
    length?: number;
    /** 宽度，长度1-8，单位：cm，未填默认补0 ；保留小数点后两位 */
    width?: number;
    /** 高度，长度1-8，单位：cm，未填默认补0 ；保留小数点后两位 */
    hight?: number;
    /** 备注 ，长度1-200，小哥手持终端上可查看此信息，最长支持展示前50个字符，超出则截取前50个字符 */
    remark?: string;
  }[];
  /** 产品信息 */
  productsReq?: CommonProductInfo;
  /** 商品信息；商品的基础信息，orderOrigin为 2 时可传入商品相关信息，更加精准计算预估费用；orderOrigin为0或者1 时 不传 */
  goods: object[];
}

// 获取运单号
export interface PreGetWaybillCodesParams {
  /** 订单来源；枚举值：0-C2C；1-B2C；2-C2B  */
  orderOrigin: ORDER_ORIGIN;
  /** 客户编码，长度1-32；适用于通用获取单号场景（获取JDV开头的运单号）；与clinicCode互斥，不能同时赋值 */
  customerCode: string;
  /** 操作人机构编码，长度1-10，适用于获取预置单号场景（例如JDJ、JDK等），使用前先与京东物流的销售沟通，若不知道使用场景则不要使用此字段；与customerCode互斥，不能同时赋值 */
  clinicCode: string;
  /** 需要获取运单号的数量，单次接口调用上限为500，长度1-3 */
  sum: number;
}

// 创建订单
export interface CreateOrderParams {
  orderId: string;
  senderContact: {
    name: string;
    mobile: string;
    phone: string;
    fullAddress: string;
    warehouseCode: string;
  };
  receiverContact: {
    name: string;
    mobile: string;
    phone: string;
    fullAddress: string;
  };
  orderOrigin: number;
  customerCode: string;
  productsReq: {
    productCode: string;
    productAttrs: {
      key: string;
    };
    addedProducts: Array<{
      productCode: string;
      productAttrs: {
        key: string;
      };
    }>;
  };
  settleType: number;
  cargoes: Array<{
    name: string;
    quantity: number;
    weight: number;
    volume: number;
    length: number;
    width: number;
    hight: number;
    remark: string;
  }>;
  goods: Array<{
    name: string;
    code: string;
    amount: number;
    quantity: number;
    goodsAddProducts: Array<{
      productCode: string;
      productAttrs: {
        key: string;
      };
    }>;
  }>;
  c2bAddedSettleTypeInfo: {
    basicFreigthSettleType: number;
    packageServiceSettleType: number;
    guaranteeMoneyServiceSettleType: number;
  };
  pickupStartTime: number;
  pickupEndTime: number;
  expectDeliveryStartTime: number;
  expectDeliveryEndTime: number;
  pickupType: number;
  remark: string;
  CommonChannelInfo: {
    channelCode: string;
    channelOrderCode: string;
  };
  waybillCode: string;
  extendProps: {
    key: string;
  };
}

// 订单修改
export interface ModifyOrderParams {
  orderId: string;
  waybillCode: string;
  orderCode: string;
  receiverContact: {
    name: string;
    mobile: string;
    fullAddress: string;
  };
  orderOrigin: number;
  customerCode: string;
  productsReq: {
    productCode: string;
    addedProducts: Array<{
      productCode: string;
      productAttrs: {
        examineMethod: string;
      };
    }>;
  };
  settleType: number;
  cargoes: Array<{
    quantity: number;
  }>;
  remark: string;
}

// 订单取消
export interface CancelOrderParams {
  waybillCode: string;
  orderCode: string;
  orderOrigin: number;
  cancelType: number;
  customerCode: string;
  cancelReason: string;
  cancelReasonCode: string;
}

// 订单状态查询
export interface GetOrderStatusParams {
  waybillCode: string;
  orderCode: string;
  orderOrigin: number;
  customerCode: string;
}

// 订单轨迹查询
export interface GetOrderTrackParams {
  waybillCode: string;
  orderCode: string;
  orderOrigin: ORDER_ORIGIN;
  customerCode: string;
}

// 获取运单实时位置
export interface GetWaybillGisTrackParams {
  /** 运单号（长度：1-50个字符） */
  waybillCode: string;
  customerCode: CommonParams["customerCode"];
}

// 查询运单预计送达时间
export interface GetWaybillEstimatedDeliveryTimeParams {
  customerCode: CommonParams["customerCode"];
  deliveryId: string;
  /** 收件人电话，长度：1-11；收件人电话和商家编码至少一个有值  */
  phone: string;
  /** 动态时间标志，是否动态的根据京东物流的物流网络计算预计送达时间；0-获取非动态时间； 1 -获取动态时间 */
  dynamicTimeFlag: number;
}

// 查询电子签名图片
export interface GetWaybillSignatureImageParams {
  /** 运单号，长度1-50 */
  deliveryId: string;
  customerCode: CommonParams["customerCode"];
}

// 查询标价运费
export interface GetWaybillPriceParams {
  /** 京东物流运单号，长度1-50 */
  businessNo: string;
  /** 客户编码，需要与下单时传入的客户编码保持一致，长度1-32 */
  sellerNo: string;
}

// 实际费用查询
export interface GetActualFeeInfoParams {
  waybillCode: string;
  orderCode: string;
  orderOrigin: ORDER_ORIGIN;
  customerCode: string;
}

// 物流轨迹订阅
export interface SubscribeTraceParams {
  mobile: CommonParams["mobile"];
  orderOrigin: ORDER_ORIGIN;
  /** 京东物流运单号，长度1-50，运单号在下单接口中已返回，与物流订单号必填其一 */
  waybillCode?: string;
  /** 京东物流订单号，长度1-50，订单号在下单接口中已返回，与物流运单号必填其一 */
  orderCode?: string;
  customerCode?: CommonParams["customerCode"];
}
