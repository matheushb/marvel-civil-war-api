export interface CharacterComicEntity {
  id: string;
  characterId: string;
  comicId: string;
  created_at: Date;
  updated_at: Date;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     CharacterComic:
 *       type: object
 *       properties:
 *         characterId:
 *           type: string
 *           description: id do personagem
 *         comicId:
 *           type: string
 *           description: id do quadrinho
 *     ReturnCharacterComic:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID da relacao
 *         characterId:
 *           type: string
 *           description: id do personagem
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
