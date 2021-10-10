import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT ?? 3000,
  baseURL: process.env.REACT_APP_API_BASE_URL,
};
