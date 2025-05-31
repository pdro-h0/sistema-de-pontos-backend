import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repository/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findById(id: string): Promise<string | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;
    return user?.name;
  }

  async register(user: User): Promise<void> {
    await this.users.push(user);
  }
}
