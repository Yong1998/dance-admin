import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
export interface Response<T> {
  data: T;
  code: number;
  message: string;
  success: boolean;
  timestamp: string;
}


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({ 
        data,
        code: HttpStatus.OK,
        message: '请求成功',
        success: true,
        timestamp: new Date().toISOString(),
       })),
    );
      
  }
}