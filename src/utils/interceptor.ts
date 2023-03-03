import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // write a log to the console before the request is handled by the route handler and after the response is sent
  async intercept(context: ExecutionContext, next: CallHandler) {
    console.log("Before...");

    const now = Date.now();
    const response = next.handle();
    const time = Date.now() - now;
    console.log(`After... ${time}ms`);

    return response;
  }
}
