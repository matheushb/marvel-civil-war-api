import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { validate } from "../common/middlewares/validation.middleware";
import { CharacterComicController } from "./character-comic.controller";
import { CharacterComicRepository } from "./character-comic.repository";
import { CharacterComicService } from "./character-comic.service";
import { updateCharacterComicDto } from "./dto/character-comic-update.dto";
import { createCharacterComicDto } from "./dto/character-comic-create.dto";

const characterComicController = new CharacterComicController(
  new CharacterComicService(new CharacterComicRepository())
);

/**
 * @swagger
 * tags:
 *   name: CharacterComics
 *   description: Rotas para operações relacionadas a character comic
 */
const characterComicRouter = Router();

/**
 * @swagger
 * /character-comic:
 *   post:
 *     summary: Cria um novo character comic
 *     tags: [CharacterComics]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CharacterComic'
 *     responses:
 *       201:
 *         description: character comic criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCharacterComic'
 * */
characterComicRouter.post(
  "/character-comic",
  validate(createCharacterComicDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterComicController.create(req, res);
  })
);

/**
 * @swagger
 * /character-comic:
 *   get:
 *     summary: Retorna todos os character comic
 *     tags: [CharacterComics]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *        200:
 *          description: Lista de character comic retornada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReturnCharacterComic'
 * */
characterComicRouter.get(
  "/character-comic",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterComicController.findAll(req, res);
  })
);

/**
 * @swagger
 * /character-comic/id/{id}:
 *   get:
 *     summary: Retorna um character comic pelo ID
 *     tags: [CharacterComics]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do character comic a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: character comic retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCharacterComic'
 * */
characterComicRouter.get(
  "/character-comic/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterComicController.findOne(req, res);
  })
);

/**
 * @swagger
 * /character-comic/id/{id}:
 *   patch:
 *     summary: Atualiza um character comic existente pelo ID
 *     tags: [CharacterComics]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do character comic a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CharacterComic'
 *     responses:
 *       200:
 *         description: character comic atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCharacterComic'
 * */
characterComicRouter.patch(
  "/character-comic/id/:id",
  validate(updateCharacterComicDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterComicController.update(req, res);
  })
);

/**
 * @swagger
 * /character-comic/id/{id}:
 *   delete:
 *     summary: Exclui um character comic existente pelo ID
 *     tags: [CharacterComics]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do character comic a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: character comic excluído com sucesso
 */
characterComicRouter.delete(
  "/character-comic/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterComicController.remove(req, res);
  })
);

export default characterComicRouter;
