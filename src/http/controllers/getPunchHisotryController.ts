import { Request, Response } from "express";
import { getPunchHistorySchema } from "../../communication/request/GetPunchHisotryDTO";
import { GetPunchHisotryUseCase } from "../../app/userCases/GetPunchHisotryUseCase";
import { PrismaPunchClockRepository } from "../../infra/prisma/PrismaPunchClockRepository";

export const getPunchHisotryController = async (
  req: Request,
  res: Response
) => {
  const headersSchema = getPunchHistorySchema.parse(req.user);
  const useCase = new GetPunchHisotryUseCase(new PrismaPunchClockRepository());
  const punchHistory = await useCase.execute(headersSchema);
  res.status(200).json(punchHistory);
  return;
};
