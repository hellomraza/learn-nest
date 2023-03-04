import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import { Request as RequestDto } from "express";
import { Tokens, User } from "src/utils/interface";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto";
import { JwtAtGuard, JwtRtGuard, LocalAuthGuard } from "./guards";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() user: SignUpDto): Promise<Tokens> {
    return this.authService.signup(user);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Request() req: RequestDto): Promise<Tokens> {
    return this.authService.signin(req.user);
  }

  @UseGuards(JwtAtGuard)
  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Request() req: RequestDto): Promise<void> {
    await this.authService.logout(req.user);
  }

  @UseGuards(JwtRtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Request() req: RequestDto): Promise<string> {
    return this.authService.refreshTokens(req.user);
  }

  @UseGuards(JwtAtGuard)
  @Get("user")
  @HttpCode(HttpStatus.OK)
  getUser(@Request() req: RequestDto): User {
    return this.authService.getUser(req.user);
  }
}
