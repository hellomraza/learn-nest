import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAtGuard extends AuthGuard("jwt-at") {
  // This is a custom guard that extends the default passport-jwt guard
  // It is used to authenticate users using a JWT
}
