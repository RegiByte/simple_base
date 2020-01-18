import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import { errorHandler } from './helper/errorHandlers';

class App {
  constructor({ port }) {
    if (!port) {
      throw new Error('Server port undefined');
    }

    this.port = port;
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandlers();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(bodyParser.json());
  }

  routes() {
    this.server.use(router);
  }

  exceptionHandlers() {
    this.server.use((err, req, res, _next) => errorHandler(err, req, res));
  }

  start() {
    this.server.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

export default new App({
  port: process.env.APP_PORT,
});
