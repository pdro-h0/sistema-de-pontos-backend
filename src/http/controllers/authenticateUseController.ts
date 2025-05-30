import { RequestHandler } from "express";
import { authenticateUserSchema } from "../../communication/request/AuthenticateUserDTO";
import { AuthenticateUserUseCase } from "../../app/userCases/AuthenticateUserUseCase";
import { PrismaUserRepository } from "../../infra/prisma/PrismaUserRepository";
import { BcryptPasswordHasher } from "../../infra/crypt/BcryptPasswordHasher";
import jwt from "jsonwebtoken";
import { env } from "../../env";

export const authenticateUserController: RequestHandler = async (req, res) => {
  const bodySchema = authenticateUserSchema.parse(req.body);
  const useCase = new AuthenticateUserUseCase(
    new PrismaUserRepository(),
    new BcryptPasswordHasher()
  );
  const { user } = await useCase.execute(bodySchema);
  const payload = {
    userId: user.id,
    role: user.role,
  };
  const token = await jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
};
