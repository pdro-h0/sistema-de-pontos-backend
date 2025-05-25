import { User } from "../../src/domain/entities/User";
import { Role } from "../../src/domain/enums/Role";
import { IUserRepository } from "../../src/domain/repository/IUserRepository";
import { IPasswordHasher } from "../../src/domain/services/IPasswordHasher";

export const registerTestUser = async (
  passwordHasher: IPasswordHasher,
  userRepo: IUserRepository
) => {
  const createUserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: await passwordHasher.hash("password123"),
    role: Role.employee,
  };
  const userCreated = User.create(createUserData);
  await userRepo.register(userCreated);
};
