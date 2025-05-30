import { RequestHandler } from "express";
import { createUserSchema } from "../../communication/request/CreateUserDTO";
import { RegisterUserUseCase } from "../../app/userCases/RegisterUserUseCase";
import { PrismaUserRepository } from "../../infra/prisma/PrismaUserRepository";
import { BcryptPasswordHasher } from "../../infra/crypt/BcryptPasswordHasher";

export const registerUserController: RequestHandler = async (req, res) => {
  const bodySchema = createUserSchema.parse(req.body);
  const useCase = new RegisterUserUseCase(
    new PrismaUserRepository(),
    new BcryptPasswordHasher()
  );
  await useCase.execute(bodySchema);
  res.status(201).end();
  return;
};
