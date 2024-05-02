import express from "express";
import appRouter from "./app-router";
import userRouter from "./user/user.router";
import authRouter from "./auth/auth.router";
import comicRouter from "./comic/comic.router";
import creatorRouter from "./creator/creator.router";
import characterRouter from "./character/character.router";
import swaggerUi from "swagger-ui-express";
import { opts, specs } from "./common/swagger/swagger-config";
import { PrismaClient } from "@prisma/client";
import { jwtValidator } from "./common/middlewares/jwt-validator.middleware";
import { errorMiddleware } from "./common/middlewares/error-handler.middleware";

const prismaClient = new PrismaClient();

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
    this.app.use(errorMiddleware);
  }

  async database() {
    await prismaClient
      .$connect()
      .then(() => {
        console.log("Connected to database!");
      })
      .catch(async (error) => {
        await prismaClient.$disconnect();
        console.error("Error connecting to database: ", error);
      });
  }

  async middlewares() {
    this.app.use(express.json());
    this.app.use(jwtValidator(["/signup", "/signin"]));
  }

  async routes() {
    this.app.use("/api", swaggerUi.serve, swaggerUi.setup(specs, opts));
    this.app.use(appRouter);
    this.app.use(userRouter);
    this.app.use(authRouter);
    this.app.use(comicRouter);
    this.app.use(creatorRouter);
    this.app.use(characterRouter);
  }
}

export default new App().app;
