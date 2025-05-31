import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { env } from "../env";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de Ponto",
      version: "1.0.0",
      description:
        "API onde funcionários podem registrar seus horários de entrada e saída, e administradores podem acompanhar e gerenciar esses registros.",
    },
    servers: [
      {
        url: "https://sistema-de-pontos-backend.onrender.com",
      },
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/http/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
