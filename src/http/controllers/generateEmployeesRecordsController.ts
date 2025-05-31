import { Request, Response } from "express";
import { generateEmployeesRecordsQuerySchema } from "../../communication/request/GenerateEmployeesRecordsDTO";
import { generateEmployeesRecordsHeaderSchema } from "../../communication/request/GenerateEmployeesRecordsDTO";
import { PrismaPunchClockRepository } from "../../infra/prisma/PrismaPunchClockRepository";
import { GenerateEmployeesRecordsUseCase } from "../../app/userCases/GenerateEmployeesRecordsUseCase";
import { PrismaUserRepository } from "../../infra/prisma/PrismaUserRepository";

export const generateEmployeesRecordsController = async (
  req: Request,
  res: Response
) => {
  const querySchema = generateEmployeesRecordsQuerySchema.parse(req.query);
  const headersSchema = generateEmployeesRecordsHeaderSchema.parse(req.user);
  const useCase = new GenerateEmployeesRecordsUseCase(
    new PrismaPunchClockRepository(),
    new PrismaUserRepository()
  );
  const employeeRecords = await useCase.execute(querySchema, headersSchema);
  res.status(200).json(employeeRecords);
  return;
};
