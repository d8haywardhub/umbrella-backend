import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import Controller from './common/interfaces/controller.interface';
import errorMiddleware from './common/middleware/error.middleware';
import loggerMiddleware from './common/middleware/logger.middleware';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: any) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(loggerMiddleware);
    this.app.use(cors({
      origin: "http://localhost:3001",
      credentials: true
    }));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToTheDatabase() {
    const {
      MONGO_DOMAIN,
      MONGO_PORT,
      MONGO_DBNAME
    } = process.env;

    mongoose.connect(`${MONGO_DOMAIN}:${MONGO_PORT}/${MONGO_DBNAME}`, { "useNewUrlParser": true,  "useUnifiedTopology": true, "useFindAndModify": false });
    //await mongoose.connect(config.mongoUrl, { "useNewUrlParser": true,  "useUnifiedTopology": true });

  }
}

export default App;
