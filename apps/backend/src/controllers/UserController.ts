import { Post, Route, Body, Controller, Request, Response } from "tsoa";
import express from 'express';
import { ApiError } from "../ApiError";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";

export interface LoginResponse {
  /**
   * The token used to authenticate against the socket.io layer;
   * as well as the token used to refresh for new JWTs.
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

const emailValidator = require("email-validator");
const usernameValidator = new RegExp('[a-zA-Z0-9]+');

@Route("users")
export class UserController extends Controller {
  @Post("/login")
  public async loginUser(
    @Request() req: express.Request
  ): Promise<LoginResponse> {
    const auth = await new AuthService().login(req.body.username, req.body.password);
    this.setHeader('Set-Cookie', `token=${auth.jwt}; HttpOnly`);
    return {
      token: auth.token.token
    }
  }

  @Response<ApiError>(400, "UserExists")
  @Response<ApiError>(400, 'EmailInvalid')
  @Response<ApiError>(400, 'UsernameInvalid')
  @Response<ApiError>(400, 'PasswordInvalid')
  @Post("/register")
  public async register(
    @Body() req: RegisterRequest
  ): Promise<LoginResponse> {
    // Validation; todo: find a library to do this?
    if (!req.email || !emailValidator.validate(req.email))
      throw new ApiError('EmailInvalid', 400, 'Email address is a required field and must be valid.');
    if (!req.username || !usernameValidator.test(req.username))
      throw new ApiError('UsernameInvalid', 400, 'Username is a required field and must be valid.');
    if (req.username.length < 3 || req.username.length > 20)
      throw new ApiError('UsernameInvalid', 400, 'Username must be at least 3 characters and less than 20 characters.');
    if (!req.password || req.password.length < 6 || req.password.length > 20)
      throw new ApiError('PasswordInvalid', 400, "Password is a required field and must be between 6 and 20 characters.");
    
      // Create the user...
    const user = await new UserService().add(
      req.email,
      req.username,
      req.password
    );

    // Create auth for them.
    const auth = await new AuthService().login(user, req.password);
    this.setHeader('Set-Cookie', `token=${auth.jwt}; HttpOnly`);
    return {
      token: auth.token.token
    }
  }
}