import { randomUUID } from "node:crypto";
import { PunchClockType } from "../enums/PunchClockType";

export class PunchClock {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly type: PunchClockType,
    readonly timestamp: Date
  ) {}

  static create(userId: string, type: PunchClockType) {
    const id = randomUUID();
    const timestamp = new Date();
    return new PunchClock(id, userId, type, timestamp);
  }
}
