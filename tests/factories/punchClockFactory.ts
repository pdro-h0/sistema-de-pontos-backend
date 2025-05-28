import { PunchClock } from "../../src/domain/entities/PunchClock";
import { PunchClockType } from "../../src/domain/enums/PunchClockType";
import { IPunchClockRepository } from "../../src/domain/repository/IPunchClockRepository";

export const registerTestPunchClock = async (
  punchClockRepo: IPunchClockRepository
) => {
  const checkIn = new PunchClock(
    "1",
    "user-1",
    PunchClockType.checkIn,
    new Date("2025-07-05T07:00:00.000Z")
  );
  const checkOut = new PunchClock(
    "2",
    "user-1",
    PunchClockType.checkOut,
    new Date("2025-07-05T18:00:00.000Z")
  );
  await punchClockRepo.register(checkIn);
  await punchClockRepo.register(checkOut);
};
