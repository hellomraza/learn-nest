import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Request as RequestDto } from "express";
import { User } from "src/utils/interface/user.interface";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/auth.signup.dto";
import { LocalAuthGuard } from "./Guards/auth.guard";
import { JwtGuard } from "./Guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(
    @Body() user: SignUpDto,
  ): Promise<{ user: User; access_token: string }> {
    return this.authService.signup(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  signin(@Request() req: RequestDto): Promise<{ access_token: string }> {
    return this.authService.signin(req.user);
  }

  @UseGuards(JwtGuard)
  @Get("user")
  getUser(@Request() req: RequestDto): User {
    return this.authService.getUser(req.user);
  }
}
