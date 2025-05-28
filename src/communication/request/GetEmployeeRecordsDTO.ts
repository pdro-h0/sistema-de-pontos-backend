import { z } from "zod";

export const getEmployeeRecordsSchema = z.object({
  adminId: z.string().uuid(),
  employeeId: z.string().uuid().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
export type GetEmployeeRecordsDTO = z.infer<typeof getEmployeeRecordsSchema>;
