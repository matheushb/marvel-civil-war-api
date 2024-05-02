export interface ComicCreatorEntity {
  id: string;
  creatorId: string;
  comicId: string;
  created_at: Date;
  updated_at: Date;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     ComicCreator:
 *       type: object
 *       properties:
 *         creatorId:
 *           type: string
 *           description: id do criador
 *         comicId:
 *           type: string
 *           description: id do quadrinho
 *     ReturnComicCreator:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID da relacao
 *         creatorId:
 *           type: string
 *           description: id do criador
 *         comicId:
 *           type: string
 *           description: id do quadrinho
 *         createdAt:
 *           type: string
 *           description: Data de criação da relação
 *           example: 2024-03-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: Data de atualização da relação
 *           example: 2024-03-01T00:00:00.000Z
 */
