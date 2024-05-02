import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { validate } from "../common/middlewares/validation.middleware";
import { ComicCreatorController } from "./comic-creator.controller";
import { ComicCreatorRepository } from "./comic-creator.repository";
import { ComicCreatorService } from "./comic-creator.service";
import { createComicCreatorDto } from "./dto/comic-creator-create.dto";
import { updateComicCreatorDto } from "./dto/comic-creator-update.dto";

const comicCreatorController = new ComicCreatorController(
  new ComicCreatorService(new ComicCreatorRepository())
);

/**
 * @swagger
 * tags:
 *   name: ComicCreators
 *   description: Rotas para operações relacionadas a comic-creator
 */
const comicCreatorRouter = Router();

/**
 * @swagger
 * /comic-creator:
 *   post:
 *     summary: Cria um novo comic-creator
 *     tags: [ComicCreators]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComicCreator'
 *     responses:
 *       201:
 *         description: comic-creator criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnComicCreator'
 * */
comicCreatorRouter.post(
  "/comic-creator",
  validate(createComicCreatorDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicCreatorController.create(req, res);
  })
);

/**
 * @swagger
 * /comic-creator:
 *   get:
 *     summary: Retorna todos os comic-creator
 *     tags: [ComicCreators]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *        200:
 *          description: Lista de comic-creator retornada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReturnComicCreator'
 * */
comicCreatorRouter.get(
  "/comic-creator",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicCreatorController.findAll(req, res);
  })
);

/**
 * @swagger
 * /comic-creator/id/{id}:
 *   get:
 *     summary: Retorna um comic-creator pelo ID
 *     tags: [ComicCreators]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do comic-creator a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: comic-creator retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnComicCreator'
 * */
comicCreatorRouter.get(
  "/comic-creator/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicCreatorController.findOne(req, res);
  })
);

/**
 * @swagger
 * /comic-creator/id/{id}:
 *   patch:
 *     summary: Atualiza um comic-creator existente pelo ID
 *     tags: [ComicCreators]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do comic-creator a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComicCreator'
 *     responses:
 *       200:
 *         description: comic-creator atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnComicCreator'
 * */
comicCreatorRouter.patch(
  "/comic-creator/id/:id",
  validate(updateComicCreatorDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicCreatorController.update(req, res);
  })
);

/**
 * @swagger
 * /comic-creator/id/{id}:
 *   delete:
 *     summary: Exclui um comic-creator existente pelo ID
 *     tags: [ComicCreators]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do comic-creator a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: comic-creator excluído com sucesso
 */
comicCreatorRouter.delete(
  "/comic-creator/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicCreatorController.remove(req, res);
  })
);

export default comicCreatorRouter;
