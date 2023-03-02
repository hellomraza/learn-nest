import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request as RequestDto } from "express";
import { User } from "src/user/interface/user.interface";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/auth.signup.dto";
import { LocalAuthGuard } from "./Guards/auth.guard";
import { JwtGuard } from "./Guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("signup")
  signup(
    @Request() req: RequestDto,
    @Body() user: SignUpDto,
  ): Promise<{ user: User; access_token: string }> {
    return this.authService.signup(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  signin(@Request() req: RequestDto) {
    // return this.authService.createToken(req.user);
  }

  @UseGuards(JwtGuard)
  @Get("user")
  getUser(@Request() req: RequestDto) {
    return req.user;
    // return this.authService.getUser();
  }
}
