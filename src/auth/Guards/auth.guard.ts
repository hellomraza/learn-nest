import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  // This is a custom guard that extends the default passport-local guard
  // It is used to authenticate users using email and password
}
