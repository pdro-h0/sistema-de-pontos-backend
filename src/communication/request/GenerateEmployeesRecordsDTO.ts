import { z } from "zod";

export const generateEmployeesRecordsQuerySchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
export const generateEmployeesRecordsHeaderSchema = z.object({
  adminId: z.string().uuid(),
});
export type GenerateEmployeesRecordsQueryDTO = z.infer<
  typeof generateEmployeesRecordsQuerySchema
>;
export type GenerateEmployeesRecordsHeaderDTO = z.infer<
  typeof generateEmployeesRecordsHeaderSchema
>;
