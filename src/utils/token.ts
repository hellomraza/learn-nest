import * as jwt from "jsonwebtoken";
import { User } from "src/user/interface/user.interface";

export const createToken = (user: User, secret: string) => {
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
