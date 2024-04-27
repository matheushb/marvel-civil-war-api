import express from 'express';
import appRouter from './app-router';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  async database() {}

  async middlewares() {}

  async routes() {
    this.app.use(appRouter);
  }
}

export default new App().app;
