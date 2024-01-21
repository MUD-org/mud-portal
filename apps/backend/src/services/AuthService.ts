import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { ApiError } from "../ApiError";
import { Users, UserTokens } from "../__generated__";
import { UserService } from "./UserService";
import db, {user_tokens} from '../database';
import config from "../config";
import { TimeExpiringDictionary } from '../utils/TimeExpiringDictionary';

const bcrypt = require('bcrypt');
const ssoCache = new TimeExpiringDictionary<LoginResponse>();

export interface LoginResponse {
  jwt: string,
  token: UserTokens
}

export class AuthService {
  public async ssoLogin(sso: uuidv4) : Promise<LoginResponse> {
    const response = ssoCache.get(sso);
    ssoCache.expire(sso);
    return response;
  }

  public async login(usernameOrEmail: string, raw_password: string) : Promise<LoginResponse>;
  public async login(user: Users, raw_password: string)             : Promise<LoginResponse>;
  public async login(a: Users|string, raw_password: string)         : Promise<LoginResponse> {
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

  /**
   * Produces a valid SSO token that can be used for one login; good for a few seconds.
   * @param lr A valid login-response; likely provided by login()
   * @returns The single sign-on token
   */
  public async produceSso(lr: LoginResponse) : Promise<uuidv4> {
    const sso = uuidv4();
    ssoCache.set(sso, lr, 30);
    return sso;
  }
}