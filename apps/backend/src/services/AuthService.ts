import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { ApiError } from "../ApiError";
import { Users } from "../__generated__";
import { UserService } from "./UserService";
import config from "../config";
import { TimeExpiringDictionary } from '../utils/TimeExpiringDictionary';

const bcrypt = require('bcrypt');
const ssoCache = new TimeExpiringDictionary<LoginResponse>();

export interface LoginResponse {
  jwt: string
}

export class AuthService {
  public async ssoLogin(sso: uuidv4) : Promise<LoginResponse> {
    const response = ssoCache.get(sso);
    if (!response)
      throw new ApiError('InvalidSSOToken', 400, "The provided SSO token has expired or is not valid.");
    ssoCache.expire(sso);
    return response;
  }

  public async login(usernameOrEmail: string, raw_password: string) : Promise<LoginResponse>;
  public async login(user: Users, raw_password: string)             : Promise<LoginResponse>;
  public async login(a: Users|string, raw_password: string)         : Promise<LoginResponse> {
    console.log(a, raw_password);
    let user: Users = typeof a === 'string' 
      ? await new UserService().get(a)
      : a;
    console.log(a);
    if (!user)
      throw new ApiError('NoUser', 400, 'No user exists by that id.');

    if (!await bcrypt.compare(raw_password, user.password_hash))
      throw new ApiError('IncorrectPassword', 401, 'Password was not correct.');

    return {
      jwt: jwt.sign(
        { 
          subject: user.id,
          audiences: config.auth.audiences
        }, 
        config.auth.tokenSecret, 
        { 
          expiresIn: '2 days', 
          algorithm: "HS256" 
        })
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