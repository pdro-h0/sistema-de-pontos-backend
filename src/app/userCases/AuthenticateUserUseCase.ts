import { IUserRepository } from "../../domain/repository/IUserRepository";
import { AuthenticateUserDTO } from "../../communication/request/AuthenticateUserDTO";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import { AppError } from "../../http/middlewares/errorHandler";

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(input: AuthenticateUserDTO) {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user) throw new AppError(400, "Invalid credentials");
    const doesPasswordMatches = await this.passwordHasher.compare(
      input.password,
      user.password
    );
    if (!doesPasswordMatches) throw new AppError(400, "Invalid credentials");
    return { user };
  }
}
