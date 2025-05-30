import { z } from "zod";
import { PunchClockType } from "../../domain/enums/PunchClockType";

export const createPunchClockHeadersSchema = z.object({
  userId: z.string().uuid(),
});
export const createPunchClockBodySchema = z.object({
  type: z.nativeEnum(PunchClockType),
});
export type createPunchClockHeadersDTO = z.infer<
  typeof createPunchClockHeadersSchema
>;
export type createPunchClockBodyDTO = z.infer<
  typeof createPunchClockBodySchema
>;
