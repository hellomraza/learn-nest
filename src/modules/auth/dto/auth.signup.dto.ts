import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
}
