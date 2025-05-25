import { RegisterUserUseCase } from "../src/app/userCases/RegisterUserUseCase";
import { Role } from "../src/domain/enums/Role";
import { IUserRepository } from "../src/domain/repository/IUserRepository";
import { IPasswordHasher } from "../src/domain/services/IPasswordHasher";
import { InMemoryUserRepository } from "../src/infra/inMemory/InMemoryUserRepository";
import { FakePasswordHasher } from "./fakes/FakePasswordHasher";

describe("REGISTER USER", () => {
  let userRepo: IUserRepository;
  let passwordHasher: IPasswordHasher;
  let sut: RegisterUserUseCase;

  beforeEach(async () => {
    userRepo = new InMemoryUserRepository();
    passwordHasher = new FakePasswordHasher();
    sut = new RegisterUserUseCase(userRepo, passwordHasher);
  });
  it("should register a new user", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: Role.employee,
    };
    await sut.execute(input);
    const userCreated = await userRepo.findByEmail(input.email);
    expect(userCreated).toBeDefined();
    expect(userCreated?.id).toBeDefined();
    expect(userCreated?.name).toBe(input.name);
  });

  it("should not register two users with same e-mail", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: Role.employee,
    };
    await sut.execute(input);
    const duplicatedInput = {
      name: "Fulano",
      email: "john.doe@example.com",
      password: "123password",
      role: Role.employee,
    };
    await expect(sut.execute(duplicatedInput)).rejects.toThrow(
      "User already exists"
    );
  });
});
