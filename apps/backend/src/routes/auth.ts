import jwt from 'jsonwebtoken';
import log from '../logging';
import config from '../config';

export type JwtUserBody = {
  id: number,
  username: string,
  email: string,
  audiences: Array<string>
}

export default function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  log.debug(token);

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.auth.tokenSecret, (err: any, payload: any) => {
    if (err) {
      log.error(err);
      return res.sendStatus(403);
    }
    log.debug(payload);
    const user = payload as JwtUserBody;
    if (!user.audiences.includes(config.server.name)) {
      return res.sendStatus(403);
    }
    req.user = user;
    log.debug(user);
    next();
  })
}