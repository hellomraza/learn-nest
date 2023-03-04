import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtRtGuard extends AuthGuard("jwt-rt") {
  // This is a custom guard that extends the default passport-jwt guard
  // It is used to authenticate users using a JWT
}
