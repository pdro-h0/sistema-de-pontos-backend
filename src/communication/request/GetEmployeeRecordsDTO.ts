import { z } from "zod";

export const getEmployeeRecordsQuerySchema = z.object({
  employeeId: z.string().uuid().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
export const getEmployeeRecordsHeaderSchema = z.object({
  adminId: z.string().uuid(),
});
export type GetEmployeeRecordsQueryDTO = z.infer<
  typeof getEmployeeRecordsQuerySchema
>;
export type GetEmployeeRecordsHeaderDTO = z.infer<
  typeof getEmployeeRecordsHeaderSchema
>;
