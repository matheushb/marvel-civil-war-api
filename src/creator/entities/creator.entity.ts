export interface CreatorEntity {
  id: string;
  name: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Creator:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do criador
 *           example: Matheus Baraldi
 *         role:
 *           type: string
 *           description: Função do criador
 *           example: WRITER
 *     ReturnCreator:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID do usuário
 *         name:
 *           type: string
 *           description: Nome do criador
 *           example: Matheus Baraldi
 *         role:
 *           type: string
 *           description: Função do criador
 *           example: WRITER
 *         createdAt:
 *           type: string
 *           description: Data de criação do criador
 *           example: 2024-03-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: Data de atualização do criador
 *           example: 2024-03-01T00:00:00.000Z
 */
