import { Post, Route, Controller, Request, Security } from "tsoa";
import SessionProvider, { GameWorld } from "../providers/SessionProvider";

@Route("worlds")
export class WorldController extends Controller {
  @Post("/connect")
  @Security("jwt")
  public async connect(
    @Request() request: any
  ): Promise<string> {
    const session = SessionProvider.getOrCreateSession(request.user);
    const world = new GameWorld();
    world.host = 'moo.torchship.org';
    world.port = 7777;
    session.connectNew(world);
    return "ok";
  }
}