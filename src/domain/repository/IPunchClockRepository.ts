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
  getAll(): Promise<PunchClock[]>;
  findByFilters(input: {
    adminId: string;
    startDate?: Date;
    endDate?: Date;
    employeeId?: string;
  }): Promise<PunchClock[]>;
}
