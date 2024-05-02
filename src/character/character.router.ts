import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { validate } from "../common/middlewares/validation.middleware";
import { CharacterController } from "./character.controller";
import { CharacterRepository } from "./character.repository";
import { CharacterService } from "./character.service";
import { updateCharacterDto } from "./dto/update-character.dto";

const characterController = new CharacterController(
  new CharacterService(new CharacterRepository())
);

/**
 * @swagger
 * tags:
 *   name: Character
 *   description: Rotas para operações relacionadas a personagens
 */
const characterRoutes = Router();

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Cria um novo personagem
 *     tags: [Character]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       201:
 *         description: personagem criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCharacter'
 * */
characterRoutes.post(
  "/characters",
  validate(updateCharacterDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterController.create(req, res);
  })
);

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Retorna todos os personagens
 *     tags: [Character]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *        200:
 *          description: Lista de personagens retornada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReturnCharacter'
 * */
characterRoutes.get(
  "/characters",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterController.findAll(req, res);
  })
);

/**
 * @swagger
 * /characters/id/{id}:
 *   get:
 *     summary: Retorna um personagem pelo ID
 *     tags: [Character]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do personagem a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: personagem retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCharacter'
 * */
characterRoutes.get(
  "/characters/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterController.findOne(req, res);
  })
);

/**
 * @swagger
 * /characters/id/{id}:
 *   patch:
 *     summary: Atualiza um personagem existente pelo ID
 *     tags: [Character]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do personagem a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       200:
 *         description: personagem atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCharacter'
 * */
characterRoutes.patch(
  "/characters/id/:id",
  validate(updateCharacterDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterController.update(req, res);
  })
);

/**
 * @swagger
 * /characters/id/{id}:
 *   delete:
 *     summary: Exclui um personagem existente pelo ID
 *     tags: [Character]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do personagem a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: personagem excluído com sucesso
 */
characterRoutes.delete(
  "/characters/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await characterController.remove(req, res);
  })
);

export default characterRoutes;
