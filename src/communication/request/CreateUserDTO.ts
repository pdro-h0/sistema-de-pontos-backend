import { z } from "zod";
import { Role } from "../../domain/enums/Role";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
