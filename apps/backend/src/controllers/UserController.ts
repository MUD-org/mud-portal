import { Post, Route, Body, Controller } from "tsoa";
import jwt from 'jsonwebtoken';
import config from '../config';

export interface LoginResponse {
  /**
   * The JSON Web Token used to authenticate further requests by the user.
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   */
  token: string
}

export interface LoginRequest {
  /**
   * The email the user used to register their account.
   */
  email: string,
  /**
   * The plaintext password the user uses to login.
   */
  password: string
}

export interface RegisterRequest {
  /**
   * The username other users will see this user represented by
   */
  username: string,
  /**
   * The password the user will be using to authenticate
   */
  password: string,
  /**
   * The email the user wishes to receive notifications on
   */
  email: string
}

@Route("users")
export class UserController extends Controller {
  @Post("/login")
  public async login(
    @Body() requestBody: LoginRequest
  ): Promise<LoginResponse> {
    return {
      token: jwt.sign({ name: 'test', email: requestBody.email, audiences: config.auth.audiences }, config.auth.tokenSecret, { expiresIn: '2 days', algorithm: "HS256" })
    };
  }

  @Post("/register")
  public async register(
    @Body() requestBody: RegisterRequest
  ): Promise<LoginResponse> {
    return {
      token: jwt.sign({ name: 'test', email: requestBody.email, audiences: config.auth.audiences }, config.auth.tokenSecret, { expiresIn: '2 days', algorithm: "HS256" })
    };
  }
}