import { Request, Response } from "express";
import { getEmployeeRecordsQuerySchema } from "../../communication/request/GetEmployeeRecordsDTO";
import { getEmployeeRecordsHeaderSchema } from "../../communication/request/GetEmployeeRecordsDTO";
import { PrismaPunchClockRepository } from "../../infra/prisma/PrismaPunchClockRepository";
import { GetEmployeeRecordsUseCase } from "../../app/userCases/GetEmployeeRecordsUseCase";

export const getEmployeesRecordsController = async (
  req: Request,
  res: Response
) => {
  const querySchema = getEmployeeRecordsQuerySchema.parse(req.query);
  const headersSchema = getEmployeeRecordsHeaderSchema.parse(req.user);
  const useCase = new GetEmployeeRecordsUseCase(
    new PrismaPunchClockRepository()
  );
  const employeeRecords = await useCase.execute(querySchema, headersSchema);
  res.status(200).json(employeeRecords);
  return;
};
