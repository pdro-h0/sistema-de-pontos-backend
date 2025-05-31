import { GetEmployeeRecordsUseCase } from "../src/app/userCases/GetEmployeeRecordsUseCase";
import { PunchClock } from "../src/domain/entities/PunchClock";
import { PunchClockType } from "../src/domain/enums/PunchClockType";
import { IPunchClockRepository } from "../src/domain/repository/IPunchClockRepository";
import { InMemoryPunchClockRepository } from "../src/infra/inMemory/InMemoryPunchClockRepository";
import { registerTestPunchClock } from "./factories/punchClockFactory";

describe("GET EMPLOYEE RECORDS", () => {
  let punchClockRepo: IPunchClockRepository;
  let sut: GetEmployeeRecordsUseCase;

  beforeEach(async () => {
    punchClockRepo = new InMemoryPunchClockRepository();
    sut = new GetEmployeeRecordsUseCase(punchClockRepo);
    await registerTestPunchClock(punchClockRepo);
  });
  it("should return a list of employee records, with filters", async () => {
    const checkIn = new PunchClock(
      "1",
      "user-2",
      PunchClockType.checkIn,
      new Date("2025-07-05T07:00:00.000Z")
    );
    const checkOut = new PunchClock(
      "2",
      "user-2",
      PunchClockType.checkOut,
      new Date("2025-07-05T18:00:00.000Z")
    );
    await punchClockRepo.register(checkIn);
    await punchClockRepo.register(checkOut);
    const input = {
      adminId: "1",
      employeeId: "user-2",
      startDate: new Date("2020-01-03"),
      endDate: new Date("2029-01-10"),
    };
    const output = await sut.execute(
      {
        employeeId: input.employeeId,
        endDate: input.endDate,
        startDate: input.startDate,
      },
      { adminId: input.adminId }
    );
    expect(output).toHaveLength(1);
    expect(output).toEqual([
      expect.objectContaining({ employee: "Employee user-2" }),
    ]);
  });
  it("should return a list of employee records, without filters", async () => {
    const checkIn = new PunchClock(
      "1",
      "user-2",
      PunchClockType.checkIn,
      new Date("2025-07-05T07:00:00.000Z")
    );
    const checkOut = new PunchClock(
      "2",
      "user-2",
      PunchClockType.checkOut,
      new Date("2025-07-05T18:00:00.000Z")
    );
    await punchClockRepo.register(checkIn);
    await punchClockRepo.register(checkOut);
    const input = {
      adminId: "1",
    };
    const output = await sut.execute(
      { employeeId: undefined, endDate: undefined, startDate: undefined },
      { adminId: input.adminId }
    );
    expect(output).toHaveLength(2);
  });
});
