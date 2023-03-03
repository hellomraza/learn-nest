import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Request as RequestDto } from "express";
import { User } from "src/utils/interface";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto";
import { LocalAuthGuard } from "./guards";
import { JwtGuard } from "./guards/jwt.guard";
import { Tokens } from "src/utils/interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() user: SignUpDto): Promise<{ user: User; tokens: Tokens }> {
    return this.authService.signup(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  signin(@Request() req: RequestDto): Promise<Tokens> {
    return this.authService.signin(req.user);
  }

  @UseGuards(JwtGuard)
  @Get("user")
  getUser(@Request() req: RequestDto): User {
    return this.authService.getUser(req.user);
  }
}
