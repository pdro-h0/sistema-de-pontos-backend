import { GenerateEmployeesRecordsUseCase } from "../src/app/userCases/GenerateEmployeesRecordsUseCase";
import { PunchClock } from "../src/domain/entities/PunchClock";
import { PunchClockType } from "../src/domain/enums/PunchClockType";
import { IPunchClockRepository } from "../src/domain/repository/IPunchClockRepository";
import { IUserRepository } from "../src/domain/repository/IUserRepository";
import { InMemoryPunchClockRepository } from "../src/infra/inMemory/InMemoryPunchClockRepository";
import { InMemoryUserRepository } from "../src/infra/inMemory/InMemoryUserRepository";
import { registerTestPunchClock } from "./factories/punchClockFactory";

describe("GENERATE EMPLOYEES RECORDS", () => {
  let punchClockRepo: IPunchClockRepository;
  let userRepo: IUserRepository;
  let sut: GenerateEmployeesRecordsUseCase;

  beforeEach(async () => {
    punchClockRepo = new InMemoryPunchClockRepository();
    userRepo = new InMemoryUserRepository();
    sut = new GenerateEmployeesRecordsUseCase(punchClockRepo, userRepo);
    await registerTestPunchClock(punchClockRepo);
  });
  it("should generate employees records", async () => {
    const checkIn = new PunchClock(
      "1",
      "user-2",
      PunchClockType.checkIn,
      new Date("2025-08-05T07:00:00.000Z")
    );
    const checkOut = new PunchClock(
      "2",
      "user-2",
      PunchClockType.checkOut,
      new Date("2025-08-05T12:00:00.000Z")
    );
    await punchClockRepo.register(checkIn);
    await punchClockRepo.register(checkOut);
    const input = {
      adminId: "1",
      startDate: new Date("2025-08-01"),
      endDate: new Date("2025-08-06"),
    };
    const output = await sut.execute(
      { endDate: input.endDate, startDate: input.startDate },
      { adminId: input.adminId }
    );
    expect(output.totalHours).toEqual(5);
    expect(output.employees).toHaveLength(1);
  });
  it("should generate employees records, without filters", async () => {
    const checkIn = new PunchClock(
      "1",
      "user-2",
      PunchClockType.checkIn,
      new Date("2025-07-12T07:00:00.000Z")
    );
    const checkOut = new PunchClock(
      "2",
      "user-2",
      PunchClockType.checkOut,
      new Date("2025-07-12T12:00:00.000Z")
    );
    await punchClockRepo.register(checkIn);
    await punchClockRepo.register(checkOut);
    const input = {
      adminId: "1",
    };
    const output = await sut.execute(
      { endDate: undefined, startDate: undefined },
      { adminId: input.adminId }
    );
    expect(output.totalHours).toEqual(16);
    expect(output.employees).toHaveLength(2);
  });
});
