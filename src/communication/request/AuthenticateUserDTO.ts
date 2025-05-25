import { z } from "zod";

export const authenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthenticateUserDTO = z.infer<typeof authenticateUserSchema>;
