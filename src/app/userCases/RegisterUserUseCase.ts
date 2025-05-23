import { CreateUserDTO } from "../../communication/request/CreateUserDTO";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import bcrypt from "bcryptjs";

export class RegisterUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: CreateUserDTO): Promise<void> {
    const user = await this.userRepo.findByEmail(input.email);
    if (user) throw new Error("User already exists");
    const passwordHash = await bcrypt.hash(input.password, 10);
    const newUser = User.create({ ...input, password: passwordHash });
    await this.userRepo.register(newUser);
  }
}
