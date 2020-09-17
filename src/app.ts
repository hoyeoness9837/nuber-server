import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";

class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub();// could be replaced with Redis or Memcached : in-memory 
    this.pubSub.ee.setMaxListeners(99);// prevents memory leakage. 
    this.app = new GraphQLServer({
      schema,
      context: req => {// from token, we make req.user, which is useful in all resolvers.
        const { connection: { context = null } = {} } = req; // give context in the connection in the req default value of null prevent error.
        return {
          req: req.request,
          pubSub: this.pubSub,
          context
        };
      }
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
