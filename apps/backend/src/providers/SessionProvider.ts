import {Socket} from 'net';
import log from '../logging';
import { JwtUserBody } from '../routes/auth';

export class GameWorld {
  private name = "";
  private id = 0;
  public host = "";
  public port = 0;

  public getName() : string {
    return this.name;
  }

  public getId() : number {
    return this.id;
  }
}
export const EMPTY_WORLD = new GameWorld();

export type IGameSession = {
  world: GameWorld;
  connection: Socket;
}

export class GameSession implements IGameSession {
  public world: GameWorld = EMPTY_WORLD;
  public connection: Socket;

  constructor(worldConnection: Socket) {
    this.connection = worldConnection;
  }
}

export class GameSessionCollection {
  private _data = new Array<GameSession>;
  
  public get(worldId: number) : GameSession | undefined;
  public get(worldName: string) : GameSession | undefined;
  public get(world: GameWorld) : GameSession | undefined;
  public get(worldIdOrNameOrClass: string|number|GameWorld) : GameSession | undefined {
    if (typeof worldIdOrNameOrClass === 'number')
      return this._data.find(s => s.world.getId() === worldIdOrNameOrClass);
    else if (typeof worldIdOrNameOrClass === 'string')
      return this._data.find(s => s.world.getName() === worldIdOrNameOrClass);
    return this._data.find(s => s.world.getId() === worldIdOrNameOrClass.getId());
  }

  public getAll(worldId: number) : Array<GameSession>;
  public getAll(worldName: string) : Array<GameSession>;
  public getAll(world: GameWorld) : Array<GameSession>;
  public getAll(worldIdOrNameOrClass: string|number|GameWorld) : Array<GameSession> {
    if (typeof worldIdOrNameOrClass === 'number')
      return this._data.filter(s => s.world.getId() === worldIdOrNameOrClass);
    else if (typeof worldIdOrNameOrClass === 'string')
      return this._data.filter(s => s.world.getName() === worldIdOrNameOrClass);
    return this._data.filter(s => s.world.getId() === worldIdOrNameOrClass.getId());
  }

  public add(session: GameSession) : void {
    this._data.push(session);
  }
}

export type IUserSession = {
  userId: number;
  activeGames: GameSessionCollection;
}

export class UserSession implements IUserSession {
  userId = 0;
  activeGames = new GameSessionCollection;

  constructor(user: JwtUserBody) {
    this.userId = user.id;
  }

  /**
   * Initializes a new connection to a game world, and begins the session.
   * @param world The world to connect to.
   */
  public connectNew(world: GameWorld) : GameSession {
    const client = new Socket();
    client.on('data', (data) => {
      log.debug(data);
    });
    client.on('close', () => {
      log.debug(`Connection closed to ${world.host}:${world.port}.`);
    });
    client.on('error', (err) => {
      log.error(err);
    });
    client.connect(world.port, world.host, () => {
      log.debug(`Connection established to ${world.host}:${world.port}.`);
    });
    const session = new GameSession(client);
    session.world = world;
    this.activeGames.add(session);
    return session;
  }
}

class SessionService {
  private _sessions = new Array<UserSession>;
  public getOrCreateSession(user: JwtUserBody) : UserSession {
    const existingSession = this._sessions.find(s => s.userId == user.id);
    if (existingSession)
      return existingSession;
    const newSession = new UserSession(user);
    this._sessions.push(newSession);
    return newSession;
  }
}

const SessionProvider = new SessionService();
export default SessionProvider;