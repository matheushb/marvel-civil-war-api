import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { SwaggerUiOptions } from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Marvel API With Postgres and Swagger",
      version: "0.1.0",
      description:
        "This is a marvel mediator API made with Express, documented with Swagger and authenticated with JWT",
    },
  },

  apis: [
    path.resolve(__dirname, "../../auth/auth.router.ts"),
    path.resolve(__dirname, "../../auth/dto/login.dto.ts"),
    path.resolve(__dirname, "../../user/user.router.ts"),
    path.resolve(__dirname, "../../user/entities/user.entity.ts"),
    path.resolve(__dirname, "../../character/character.router.ts"),
    path.resolve(__dirname, "../../character/entities/character.entity.ts"),
    path.resolve(__dirname, "../../creator/creator.router.ts"),
    path.resolve(__dirname, "../../creator/entities/creator.entity.ts"),
    path.resolve(__dirname, "../../comic/comic.router.ts"),
    path.resolve(__dirname, "../../comic/entities/comic.entity.ts"),
    path.resolve(__dirname, "../../common/security/jwt-token.entity.ts"),
  ],
} as swaggerJSDoc.Options;

export const opts = {
  swaggerOptions: { docExpansions: "none", persistAuthorization: true },
} as SwaggerUiOptions;

export const specs = swaggerJSDoc(options);
