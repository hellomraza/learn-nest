import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth.signin.dto";
import { SignUpDto } from "./dto/auth.signup.dto";
import { LocalAuthGuard } from "./auth.guard";
import { Request as RequestDto } from "express";
import { JwtGuard } from "./jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() user: SignUpDto) {
    this.authService.signup(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  signin(@Request() req: RequestDto) {
    return req.user;
    // this.authService.signin(req.user);
  }

  @UseGuards(JwtGuard)
  @Get("user")
  getUser(@Request() req: RequestDto) {
    return req.user;
    // return this.authService.getUser();
  }
}
