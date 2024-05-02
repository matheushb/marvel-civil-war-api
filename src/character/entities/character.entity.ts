/**
 * @swagger
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do personagem
 *           example: Harry Potter
 *         description:
 *           type: string
 *           description: Descricao do personagem
 *           example: Harry Potter é um personagem fictício protagonista da série homônima de livros da escritora britânica J. K. Rowling.
 *         thumbnail:
 *           type: string
 *           description: Thumbnail do personagem
 *           example: http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg
 *     ReturnCharacter:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID do usuário
 *         name:
 *           type: string
 *           description: Nome do personagem
 *           example: Harry Potter
 *         description:
 *           type: string
 *           description: Descricao do personagem
 *           example: Harry Potter é um personagem fictício protagonista da série homônima de livros da escritora britânica J. K. Rowling.
 *         thumbnail:
 *           type: string
 *           description: Thumbnail do personagem
 *           example: http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg
 *         createdAt:
 *           type: string
 *           description: Data de criação do personagem
 *           example: 2024-03-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: Data de atualização do personagem
 *           example: 2024-03-01T00:00:00.000Z
 */

export interface CharacterEntity {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  created_at: Date;
  updated_at: Date;
}
