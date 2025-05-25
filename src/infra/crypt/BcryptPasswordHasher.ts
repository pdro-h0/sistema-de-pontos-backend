import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import bcrypt from "bcryptjs";

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 6);
  }
  async compare(password: string, passwordHashed: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHashed);
  }
}
