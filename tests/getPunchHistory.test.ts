import { GetPunchHisotryUseCase } from "../src/app/userCases/GetPunchHisotryUseCase";
import { PunchClock } from "../src/domain/entities/PunchClock";
import { PunchClockType } from "../src/domain/enums/PunchClockType";
import { IPunchClockRepository } from "../src/domain/repository/IPunchClockRepository";
import { InMemoryPunchClockRepository } from "../src/infra/inMemory/InMemoryPunchClockRepository";

describe("GET PUNCH HISTORY", () => {
  let punchClockRepo: IPunchClockRepository;
  let sut: GetPunchHisotryUseCase;
  beforeEach(async () => {
    punchClockRepo = new InMemoryPunchClockRepository();
    sut = new GetPunchHisotryUseCase(punchClockRepo);
  });
  it("should get an employee punch history", async () => {
    const createPunchClockData = {
      userId: "user-1",
      type: PunchClockType.checkIn,
    };
    const createPunchClockData2 = {
      userId: "user-1",
      type: PunchClockType.checkOut,
    };
    const checkIn = new PunchClock(
      "1",
      createPunchClockData.userId,
      createPunchClockData.type,
      new Date("2023-01-01T07:00:00.000Z")
    );
    const checkOut = new PunchClock(
      "2",
      createPunchClockData2.userId,
      createPunchClockData2.type,
      new Date("2023-01-01T18:00:00.000Z")
    );
    await punchClockRepo.register(checkIn);
    await punchClockRepo.register(checkOut);
    const input = {
      userId: "user-1",
    };
    const output = await sut.execute(input);
    expect(output).toHaveLength(1);
    expect(output).toEqual([
      expect.objectContaining({
        checkIn: "07:00:00",
        checkOut: "18:00:00",
      }),
    ]);
  });
});
