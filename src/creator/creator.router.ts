import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { validate } from "../common/middlewares/validation.middleware";
import { CreatorController } from "./creator.controller";
import { CreatorService } from "./creator.service";
import { CreatorRepository } from "./creator.repository";
import { updateCreatorDto } from "./dto/update-creator.dto";

const creatorController = new CreatorController(
  new CreatorService(new CreatorRepository())
);

/**
 * @swagger
 * tags:
 *   name: Creators
 *   description: Rotas para operações relacionadas a criadores
 */
const creatorRoutes = Router();

/**
 * @swagger
 * /creators:
 *   get:
 *     summary: Retorna todos os criadores
 *     tags: [Creators]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *        200:
 *          description: Lista de criadores retornada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReturnCreator'
 * */
creatorRoutes.get(
  "/creators",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await creatorController.findAll(req, res);
  })
);

/**
 * @swagger
 * /creators/id/{id}:
 *   get:
 *     summary: Retorna um criador pelo ID
 *     tags: [Creators]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do criador a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: criador retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCreator'
 * */
creatorRoutes.get(
  "/creators/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await creatorController.findOne(req, res);
  })
);

/**
 * @swagger
 * /creators/id/{id}:
 *   patch:
 *     summary: Atualiza um criador existente pelo ID
 *     tags: [Creators]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do criador a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Creator'
 *     responses:
 *       200:
 *         description: criador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCreator'
 * */
creatorRoutes.patch(
  "/creators/id/:id",
  validate(updateCreatorDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await creatorController.update(req, res);
  })
);

/**
 * @swagger
 * /creators/id/{id}:
 *   delete:
 *     summary: Exclui um criador existente pelo ID
 *     tags: [Creators]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do criador a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: criador excluído com sucesso
 */
creatorRoutes.delete(
  "/creators/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await creatorController.remove(req, res);
  })
);

export default creatorRoutes;
