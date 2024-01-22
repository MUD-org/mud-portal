import { Get, Post, Route, Body, Controller, Response, Security } from "tsoa";
import { ApiError } from "../ApiError";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";

export interface AuthenticationResponse {
  /**
   * If an SSO token is requested, this will be populated with an SSO token
   * that can be used to authenticate once.
   */
  ssoToken?: string;
}

export interface LoginRequest {
  /**
   * The email/username the user used to register their account.
   */
  emailOrUsername: string,
  /**
   * The plaintext password the user uses to login.
   */
  password: string,
  /**
   * If set to true, an SSO will be returned on login
   */
  ssoRequest?: boolean
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
  email: string,
  /**
   * The time in unix epoch that is this user's birthday.
   */
  birthday: number,
  /**
   * If set to true, an SSO will be returned on login
   */
  ssoRequest?: boolean
}

export interface UserInfoResponse {
  username: string,
  profilePicture: string
}

const emailValidator = require("email-validator");
const usernameValidator = new RegExp('[a-zA-Z0-9]+');

@Route("users")
export class UserController extends Controller {
  @Get("/info/{userId}")
  @Security("jwt")
  public async getUserInfo() : Promise<UserInfoResponse> {
    return {
      username: 'testeroni',
      profilePicture: ''
    }
  }

  @Response<ApiError>(401, "InvalidPassword")
  @Post("/login")
  public async loginUser(
    @Body() req: LoginRequest
  ): Promise<AuthenticationResponse> {
    const auth = await new AuthService().login(req.emailOrUsername, req.password);
    const response: AuthenticationResponse = {};
    if (req.ssoRequest)
      response.ssoToken = await new AuthService().produceSso(auth);
    this.setHeader('Set-Cookie', `token=${auth.jwt}; HttpOnly; Max-Age=3600`);
    return response;
  }

  @Response<ApiError>(400, "UserExists")
  @Response<ApiError>(400, 'EmailInvalid')
  @Response<ApiError>(400, 'UsernameInvalid')
  @Response<ApiError>(400, 'PasswordInvalid')
  @Post("/register")
  public async register(
    @Body() req: RegisterRequest
  ): Promise<AuthenticationResponse> {
    // Validation; todo: find a library to do this?
    if (!req.email || !emailValidator.validate(req.email))
      throw new ApiError('EmailInvalid', 400, 'Email address is a required field and must be valid.');
    if (!req.username || !usernameValidator.test(req.username))
      throw new ApiError('UsernameInvalid', 400, 'Username is a required field and must be valid.');
    if (req.username.length < 3 || req.username.length > 20)
      throw new ApiError('UsernameInvalid', 400, 'Username must be at least 3 characters and less than 20 characters.');
    if (!req.password || req.password.length < 6 || req.password.length > 20)
      throw new ApiError('PasswordInvalid', 400, "Password is a required field and must be between 6 and 20 characters.");
    
    const response: AuthenticationResponse = {};
      // Create the user...
    const user = await new UserService().add(
      req.email,
      req.username,
      req.password,
      req.birthday
    );

    // Create auth for them.
    const auth = await new AuthService().login(user, req.password);
    this.setHeader('Set-Cookie', `token=${auth.jwt}; HttpOnly`);
    if (req.ssoRequest)
      response.ssoToken = await new AuthService().produceSso(auth);
    return response;
  }
}