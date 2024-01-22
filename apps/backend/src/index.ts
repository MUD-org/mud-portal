import express, {Express} from 'express';
import swaggerUi from "swagger-ui-express";
import log from './logging';
import config from './config';
import { RegisterRoutes } from "../lib/routes";
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app: Express = express();
app.use(cors({
  origin: config.cors.origin
}));
app.use(express.json());
app.use(express.static("public"));

// Swagger /docs page for API documentation
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

RegisterRoutes(app);

/**
 * Error handling middleware
 */
app.use((err, _req, res, next) => {
  const status = err.status || 500;
    const body: any = {
      fields: err.fields || undefined,
      message: err.message || 'An error occurred during the request.',
      name: err.name,
      status
    };
    res.status(status).json(body);
    next();
})

// WIP Socket Code
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { JwtUserBody } from './routes/auth';
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.cors.origin,
    methods: ["GET", "POST"]
  }
});

io.use((socket: Socket, next: any) => {
  const token = socket.handshake.auth.token;
  if (!token)
    return next(new Error("not authorized; no token provided"));
    jwt.verify(token, config.auth.tokenSecret, (err: any, payload: any) => {
      if (err)
        return next(err);
      const user = payload as JwtUserBody;
      socket.data.user = user;
      next();
  });
})

io.on("connection", (socket: Socket) => {
  log.debug(`Connection established by socket ID ${socket.id}.`);
});
// End WIP Socket Code

httpServer.listen(config.server.port);
// export const server = app.listen(config.server.port, () => {
//   log.info(`Application started on port ${config.server.port}!`);
// });

export default app;