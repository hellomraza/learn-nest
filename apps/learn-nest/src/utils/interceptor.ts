import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // get query name
    const queryName = context.getHandler().name;
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`${queryName} ${Date.now() - now}ms`)));
  }
}
