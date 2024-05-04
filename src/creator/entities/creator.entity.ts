export interface CreatorEntity {
  id: string;
  name: string;
  role: CreatorRole;
  created_at: Date;
  updated_at: Date;
}

export enum CreatorRole {
  WRITER = "WRITER",
  PENCILER = "PENCILLER",
  PENCILLER = "PENCILLER",
  INKER = "INKER",
  COLORIST = "COLORIST",
  LETTERER = "LETTERER",
  EDITOR = "EDITOR",
  COVER_ARTIST = "COVER_ARTIST",
  OTHER = "OTHER",
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
 *           enum: [WRITER, PENCILLER, PENCILER, INKER, COLORIST, LETTERER, EDITOR, COVER_ARTIST, OTHER]
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
 *           enum: [WRITER, PENCILLER, PENCILER, INKER, COLORIST, LETTERER, EDITOR, COVER_ARTIST, OTHER]
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
