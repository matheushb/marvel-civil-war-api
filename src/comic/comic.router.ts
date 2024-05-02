import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { validate } from "../common/middlewares/validation.middleware";
import { ComicController } from "./comic.controller";
import { ComicService } from "./comic.service";
import { ComicRepository } from "./comic.repository";
import { updateComicDto } from "./dto/update-comic.dto";
import { createComicDto } from "./dto/create-comic.dto";

const comicController = new ComicController(
  new ComicService(new ComicRepository())
);

/**
 * @swagger
 * tags:
 *   name: Comics
 *   description: Rotas para operações relacionadas a quadrinhos
 */
const comicRoutes = Router();

/**
 * @swagger
 * /comics:
 *   post:
 *     summary: Cria um novo quadrinho
 *     tags: [Comics]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comic'
 *     responses:
 *       201:
 *         description: quadrinho criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnComic'
 * */
comicRoutes.post(
  "/comics",
  validate(createComicDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicController.create(req, res);
  })
);

/**
 * @swagger
 * /comics:
 *   get:
 *     summary: Retorna todos os quadrinhos
 *     tags: [Comics]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *        200:
 *          description: Lista de quadrinhos retornada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReturnComic'
 * */
comicRoutes.get(
  "/comics",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicController.findAll(req, res);
  })
);

/**
 * @swagger
 * /comics/id/{id}:
 *   get:
 *     summary: Retorna um quadrinho pelo ID
 *     tags: [Comics]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do quadrinho a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: quadrinho retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnComic'
 * */
comicRoutes.get(
  "/comics/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicController.findOne(req, res);
  })
);

/**
 * @swagger
 * /comics/id/{id}:
 *   patch:
 *     summary: Atualiza um quadrinho existente pelo ID
 *     tags: [Comics]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do quadrinho a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comic'
 *     responses:
 *       200:
 *         description: quadrinho atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnComic'
 * */
comicRoutes.patch(
  "/comics/id/:id",
  validate(updateComicDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicController.update(req, res);
  })
);

/**
 * @swagger
 * /comics/id/{id}:
 *   delete:
 *     summary: Exclui um quadrinho existente pelo ID
 *     tags: [Comics]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do quadrinho a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: quadrinho excluído com sucesso
 */
comicRoutes.delete(
  "/comics/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await comicController.remove(req, res);
  })
);

export default comicRoutes;
