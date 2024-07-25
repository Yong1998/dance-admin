declare namespace Serv {
  interface Res<T = any> {
    isSuccess: boolean,
    message: string,
    data: T | null
  };
}