import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "src/user/interface/user.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private _userService: UserService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { email } = context.switchToHttp().getRequest().user;
    return this.validateUser(email);
  }

  private async validateUser(email: string): Promise<boolean> {
    const user = await this._userService.findByEmail(email);

    return user ? true : false;
  }
}
