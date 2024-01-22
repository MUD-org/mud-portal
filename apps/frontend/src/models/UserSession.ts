export type IUserSession = {
  id: number,
  username: string,
  profilePicture: string
}

export default class UserSession implements IUserSession {
  id = 0;
  username = "";
  profilePicture = "";
}