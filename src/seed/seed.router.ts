import { Request, Response, Router } from "express";
import { SeedController } from "./seed.controller";
import { SeedService } from "./seed.service";
import { CharacterRepository, CharacterService } from "../character";
import { ComicRepository, ComicService } from "../comic";
import { CreatorRepository, CreatorService } from "../creator";
import {
  CharacterComicRepository,
  CharacterComicService,
} from "../character-comic";
import { ComicCreatorRepository, ComicCreatorService } from "../comic-creator";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";

const seedController = new SeedController(
  new SeedService(
    new CharacterService(new CharacterRepository()),
    new ComicService(new ComicRepository()),
    new CreatorService(new CreatorRepository()),
    new CharacterComicService(new CharacterComicRepository()),
    new ComicCreatorService(new ComicCreatorRepository())
  )
);

/**
 * @swagger
 * tags:
 *   name: Seed
 *   description: Rotas para o seed
 */
const seedRouter = Router();

/**
 * @swagger
 * /seed:
 *   get:
 *     summary: Retorna status do seed
 *     tags: [Seed]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *        200:
 *          description: Aplicação seedada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *               type: string
 *               example: Seed done
 * */
seedRouter.get(
  "/seed",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await seedController.seed(req, res);
  })
);

export default seedRouter;
