import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayLoad } from "../types/jwtPayload";

export const GetUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const req = context.switchToHttp().getRequest();
    const user = req.user as JwtPayLoad;
    return user.sub;
  },
);
