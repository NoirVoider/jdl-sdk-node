export enum ENV {
  TEST = "test",
  PROD = "prod"
}

// orderOrigin-下单来源
export enum ORDER_ORIGIN {
  /** C2C: 0 个人消费者寄快递服务，C端用户发给C端用户的快递服务 */
  C2C = 0,
  /** B2C: 1 电商平台的商家（即京东物流的签约商家）发给C端用户的快递服务，或者企业发C端、B端，但重量（泡重比）小于30kg的业务 */
  B2C = 1,
  /** C2B: 2 通常是指从C端揽收送往B端，一般简称C2B业务。例如：图书回收、洗护业务、电商平台客户退货发起的逆向业务等业务场景 */
  C2B = 2
}

/** 京东物流订单状态 https://cloud.jdl.com/#/open-business-document/access-guide/267/54013 */
export enum ORDER_STATUS {
  /** 已接单 */
  RECEIVED = 100,
  /** 已下发 */
  ISSUED = 390,
  /** 已揽收 */
  COLLECTED = 420,
  /** 运输中 */
  TRANSPORTING = 430,
  /** 派送中 */
  DELIVERING = 440,
  /** 异常终止 */
  ABNORMAL_TERMINATION = 500,
  /** 妥投 */
  DELIVERED = 510,
  /** 拒收 */
  REJECTED = 530,
  /** 已取消 */
  CANCELED = 690
}
