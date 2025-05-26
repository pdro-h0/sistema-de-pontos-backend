import { PunchClock } from "../entities/PunchClock";

export interface IPunchClockRepository {
  register(punchClock: PunchClock): Promise<{ timestamp: Date }>;
  getHistory(
    userId: string
  ): Promise<
    | { date: string; checkIn: string; checkOut: string; hoursWorked: number }[]
    | []
  >;
  getByUserId(userId: string): Promise<PunchClock[]>;
}
