import { CreateUserDTO } from "../../communication/request/CreateUserDTO";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(input: CreateUserDTO): Promise<void> {
    const user = await this.userRepo.findByEmail(input.email);
    if (user) throw new Error("User already exists");
    const passwordHash = await this.passwordHasher.hash(input.password);
    const newUser = User.create({ ...input, password: passwordHash });
    await this.userRepo.register(newUser);
  }
}
