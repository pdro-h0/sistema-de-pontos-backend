import { createPunchClockBodyDTO } from "../../communication/request/CreatePunchClockDTO";
import { createPunchClockHeadersDTO } from "../../communication/request/CreatePunchClockDTO";
import { PunchClock } from "../../domain/entities/PunchClock";
import { IPunchClockRepository } from "../../domain/repository/IPunchClockRepository";
import { isSameDay } from "date-fns";
import { AppError } from "../../http/middlewares/errorHandler";

export class RegisterPunchClockUseCase {
  constructor(private readonly punchClockRepo: IPunchClockRepository) {}

  async execute(
    { type }: createPunchClockBodyDTO,
    { userId }: createPunchClockHeadersDTO
  ): Promise<{ timestamp: Date }> {
    const punchClockList = await this.punchClockRepo.getByUserId(userId);
    const hasPunchClockAlreadyRegistered = punchClockList.some(
      (punchClock) =>
        punchClock.type.toString() === type &&
        isSameDay(punchClock.timestamp, new Date())
    );
    if (hasPunchClockAlreadyRegistered) {
      throw new AppError(400, "Punch clock already registered");
    }
    const punchClock = PunchClock.create(userId, type);
    const { timestamp } = await this.punchClockRepo.register(punchClock);
    return {
      timestamp,
    };
  }
}
