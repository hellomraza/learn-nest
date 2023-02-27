import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth.signin.dto";
import { SignUpDto } from "./dto/auth.signup.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() user: SignUpDto) {
    this.authService.signup(user);
  }

  @Post("signin")
  signin(@Body() user: SignInDto) {
    this.authService.signin(user);
  }

  @Get("users")
  getUser() {
    return this.authService.getUser();
  }
}
