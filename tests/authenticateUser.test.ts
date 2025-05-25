import { AuthenticateUserUseCase } from "../src/app/userCases/AuthenticateUserUseCase";
import { IUserRepository } from "../src/domain/repository/IUserRepository";
import { IPasswordHasher } from "../src/domain/services/IPasswordHasher";
import { InMemoryUserRepository } from "../src/infra/inMemory/InMemoryUserRepository";
import { registerTestUser } from "./factories/userFactory";
import { FakePasswordHasher } from "./fakes/FakePasswordHasher";

describe("AUTHENTICATE USER", () => {
  let userRepo: IUserRepository;
  let passwordHasher: IPasswordHasher;
  let sut: AuthenticateUserUseCase;

  beforeEach(async () => {
    userRepo = new InMemoryUserRepository();
    passwordHasher = new FakePasswordHasher();
    sut = new AuthenticateUserUseCase(userRepo, passwordHasher);
    await registerTestUser(passwordHasher, userRepo);
  });

  it("should authenticate user", async () => {
    const input = {
      email: "john.doe@example.com",
      password: "password123",
    };
    const { user } = await sut.execute(input);
    expect(user.email).toBe(input.email);
  });

  it("should not authenticate user with wrong e-mail", async () => {
    const input = {
      email: "wrongEmail@test.com",
      password: "password123",
    };
    await expect(sut.execute(input)).rejects.toThrow("Invalid credentials");
  });

  it("should not authenticate user with wrong password", async () => {
    const input = {
      email: "john.doe@example.com",
      password: "wrongPassword",
    };
    await expect(sut.execute(input)).rejects.toThrow("Invalid credentials");
  });
});
