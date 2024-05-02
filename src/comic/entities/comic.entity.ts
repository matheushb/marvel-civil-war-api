export interface ComicEntity {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  created_at: Date;
  updated_at: Date;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Comic:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Titulo do comic
 *         description:
 *           type: string
 *           description: Descrição do comic
 *         thumbnail:
 *           type: string
 *           description: Thumbnail do comic
 *     ReturnComic:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID do usuário
 *         title:
 *           type: string
 *           description: Titulo do comic
 *         description:
 *           type: string
 *           description: Descrição do comic
 *         thumbnail:
 *           type: string
 *           description: Thumbnail do comic
 *         createdAt:
 *           type: string
 *           description: Data de criação do comic
 *           example: 2024-03-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: Data de atualização do comic
 *           example: 2024-03-01T00:00:00.000Z
 */
