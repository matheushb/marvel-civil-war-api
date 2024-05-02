import { Router } from "express";

/**
 * @swagger
 * tags:
 *   name: App
 *   description: Rota para operações relacionadas a aplicação
 */
const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna status da aplicação
 *     tags: [App]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *        200:
 *          description: Aplicação rodando normalmente
 *          content:
 *            application/json:
 *              schema:
 *               type: string
 *               example: API is running
 * */
router.get("/", (req, res) => {
  res.send("API is running");
});

export default router;
