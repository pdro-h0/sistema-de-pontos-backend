import { z } from "zod";

export const getPunchHisotryResponse = z.array(
  z.object({
    date: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    hoursWorked: z.number(),
  })
);
export type GetPunchHisotryResponseDTO = z.infer<
  typeof getPunchHisotryResponse
>;
