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

  @Get("users")
  getUser() {
    return this.authService.getUser();
  }
}
