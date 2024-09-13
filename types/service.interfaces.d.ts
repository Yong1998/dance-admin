declare namespace Serv {
  interface IRes<T = any> {
    message: string,
    code: number,
    data?: T
  };

  interface IAuthUser {
    userId: number
    storeId?: number
    roles?: any[]
    /** 过期时间 */
    exp?: number
    /** 签发时间 */
    iat?: number
  }
}