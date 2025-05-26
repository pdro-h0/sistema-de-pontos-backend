import { RegisterPunchClockUseCase } from "../src/app/userCases/RegisterPunchClockUseCase";
import { PunchClockType } from "../src/domain/enums/PunchClockType";
import { IPunchClockRepository } from "../src/domain/repository/IPunchClockRepository";
import { InMemoryPunchClockRepository } from "../src/infra/inMemory/InMemoryPunchClockRepository";

describe("REGISTER PUNCH CLOCK", () => {
  let punchClockRepo: IPunchClockRepository;
  let sut: RegisterPunchClockUseCase;

  beforeEach(async () => {
    punchClockRepo = new InMemoryPunchClockRepository();
    sut = new RegisterPunchClockUseCase(punchClockRepo);
  });
  it("Should register punch clock", async () => {
    const input = {
      userId: "user-1",
      type: PunchClockType.checkIn,
    };
    const output = await sut.execute(input);
    expect(output.timestamp).toBeInstanceOf(Date);
  });
  it("should not be able to register the same punch clock twice in the same day", async () => {
    const input = {
      userId: "user-1",
      type: PunchClockType.checkIn,
    };
    await sut.execute(input);
    await expect(sut.execute(input)).rejects.toThrow(
      "Punch clock already registered"
    );
  });
});
