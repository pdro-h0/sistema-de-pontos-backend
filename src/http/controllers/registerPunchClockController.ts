import { Request, Response } from "express";
import { createPunchClockBodySchema } from "../../communication/request/CreatePunchClockDTO";
import { createPunchClockHeadersSchema } from "../../communication/request/CreatePunchClockDTO";
import { RegisterPunchClockUseCase } from "../../app/userCases/RegisterPunchClockUseCase";
import { PrismaPunchClockRepository } from "../../infra/prisma/PrismaPunchClockRepository";

export const RegisterPunchClockController = async (
  req: Request,
  res: Response
) => {
  const bodySchema = createPunchClockBodySchema.parse(req.body);
  const headerschema = createPunchClockHeadersSchema.parse(req.user);
  const useCase = new RegisterPunchClockUseCase(
    new PrismaPunchClockRepository()
  );
  const { timestamp } = await useCase.execute(bodySchema, headerschema);
  res.status(200).json({ timestamp });
  return;
};
