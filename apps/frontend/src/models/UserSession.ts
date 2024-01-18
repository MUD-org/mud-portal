export type IUserSession = {
  id: number,
  token: string,
  username: string,
  profilePicture: string
}

export default class UserSession implements IUserSession {
  id = 0;
  token = "";
  username = "";
  profilePicture = "";
}