import { PunchClock } from "../entities/PunchClock";

export interface IPunchClockRepository {
  register(punchClock: PunchClock): Promise<{ timestamp: Date }>;
  getByUserId(userId: string): Promise<PunchClock[]>;
  findByFilters(input: {
    adminId: string;
    startDate?: Date;
    endDate?: Date;
    employeeId?: string;
  }): Promise<PunchClock[]>;
}
