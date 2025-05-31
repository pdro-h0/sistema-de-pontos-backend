import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { db } from "../../lib/prisma";

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role as any,
    };
  }
  async register(user: User): Promise<void> {
    await db.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        role: user.role,
      },
    });
  }

  async findById(id: string): Promise<string | null> {
    const user = await db.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return user.name;
  }
}
