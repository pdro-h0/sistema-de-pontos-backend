import { z } from "zod";
import { PunchClockType } from "../../domain/enums/PunchClockType";

export const createPunchClockSchema = z.object({
  userId: z.string().uuid(),
  type: z.nativeEnum(PunchClockType),
});
export type createPunchClockDTO = z.infer<typeof createPunchClockSchema>;
