import { ApiError } from '../ApiError';
import { Users } from '../__generated__';
import db, {users} from '../database';
import config from '../config';

const bcrypt = require('bcrypt');

export class UserService {
  public async add(
    email: string,
    username: string,
    password: string,
    birthday: number
  ): Promise<Users> {
    if (await users(db).findOne({email: email}))
      throw new ApiError("UserExists", 400, "A user exists with that email.");
    if (await users(db).findOne({username: username}))
      throw new ApiError("UserExists", 400, "A user exists with that username.");
    return await users(db).insert({email, username, birthday, created_on: Date.now(), password_hash: await this.hash(password)})[0];
  }

  public async get(
    emailOrUsername: string
  ) : Promise<Users> {
    const user = await users(db).findOne({email: emailOrUsername})
      || await users(db).findOne({username: emailOrUsername});
    if (!user)
      throw new ApiError('UserDoesNotExist', 400, "No user exists with that username or email.");
    return user;
  }

  private async hash(password: string) {
    return await bcrypt.hash(password, config.crypto.saltRounds);
  }
}