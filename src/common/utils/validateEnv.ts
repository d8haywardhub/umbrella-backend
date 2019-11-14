import {
  cleanEnv, port, str,
} from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    MONGO_DOMAIN: str(),
    MONGO_DBNAME: str(),
    MONGO_PORT: port(),
    WEATHER_URL: str(),
    WEATHER_APPID: str()
  });
}

export default validateEnv;
