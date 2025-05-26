import { createPunchClockDTO } from "../../communication/request/CreatePunchClockDTO";
import { PunchClock } from "../../domain/entities/PunchClock";
import { IPunchClockRepository } from "../../domain/repository/IPunchClockRepository";
import { isSameDay } from "date-fns";

export class RegisterPunchClockUseCase {
  constructor(private readonly punchClockRepo: IPunchClockRepository) {}

  async execute(input: createPunchClockDTO): Promise<{ timestamp: Date }> {
    const punchClockList = await this.punchClockRepo.getByUserId(input.userId);
    const hasPunchClockAlreadyRegistered = punchClockList.some(
      (punchClock) =>
        punchClock.type.toString() !== "" &&
        isSameDay(new Date(punchClock.timestamp), new Date())
    );
    if (hasPunchClockAlreadyRegistered) {
      throw new Error("Punch clock already registered");
    }
    const punchClock = PunchClock.create(input.userId, input.type);
    const { timestamp } = await this.punchClockRepo.register(punchClock);
    return {
      timestamp,
    };
  }
}
