import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { Neo4jService } from "src/neo4j/neo4j.service";
import { SignUpDto } from "src/auth/dto/auth.signup.dto";

@Controller("users")
export class UserController {
  @Get()
  getUsers() {
    return "sdlifjk";
  }
}
