import { IPasswordHasher } from "../../src/domain/services/IPasswordHasher";

export class FakePasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return `${password}_hashed`;
  }
  async compare(password: string, passwordHashed: string): Promise<boolean> {
    return passwordHashed === `${password}_hashed`;
  }
}
