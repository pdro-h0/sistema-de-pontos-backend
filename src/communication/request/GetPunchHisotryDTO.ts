import { z } from "zod";

export const getPunchHistorySchema = z.object({
  userId: z.string().uuid(),
});
export type GetPunchHisotryDTO = z.infer<typeof getPunchHistorySchema>;
