import { ApiError } from "../ApiError";
import { Users, UserTokens } from "../__generated__";
import { UserService } from "./UserService";
import db, {user_tokens} from '../database';
import jwt from 'jsonwebtoken';
import config from "../config";


const bcrypt = require('bcrypt');

export interface LoginResponse {
  jwt: string,
  token: UserTokens
}

export class AuthService {
  public async login(usernameOrEmail: string, raw_password: string);
  public async login(user: Users, raw_password: string);
  public async login(a: Users|string, raw_password: string) {
    let user: Users = typeof a === 'string' 
      ? await new UserService().get(a)
      : a;

    if (!await bcrypt.compare(raw_password, user.password_hash))
      throw new ApiError('IncorrectPassword', 401, 'Password was not correct.');

    const token = await user_tokens(db).insert({user_id: user.id, token: 'ranodm guid', expires_on: Date.now()})[0];
    return {
      jwt: jwt.sign(
        { 
          subject: user.id,
          audiences: config.auth.audiences,
          refresh: token.token
        }, 
        config.auth.tokenSecret, 
        { 
          expiresIn: '2 days', 
          algorithm: "HS256" 
        }),
        token
    };
  }
}