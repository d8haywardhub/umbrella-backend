import 'dotenv/config';
import App from './app';
import validateEnv from './common/utils/validateEnv';

import AppControllers from './app.controllers';
 
validateEnv();

const app = new App(
  AppControllers.controllers,
  process.env.PORT
);

app.listen();