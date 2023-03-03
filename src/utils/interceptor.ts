import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // write a log to the console before the request is handled by the route handler and after the response is sent
  intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    console.log("Before...");
    const now = Date.now();
    return next
      .handle()
      .pipe()
      .toPromise()
      .then(() => {
        console.log(`After... ${Date.now() - now}ms`);
      });
  }
}
