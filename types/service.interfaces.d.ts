declare namespace Serv {
  interface IRes<T = any> {
    message: string,
    code: number,
    data?: T
  };

  interface IAuthUser {
    uid: string
    pv: number
    /** 过期时间 */
    exp?: number
    /** 签发时间 */
    iat?: number
    roles?: string[]
  }
}