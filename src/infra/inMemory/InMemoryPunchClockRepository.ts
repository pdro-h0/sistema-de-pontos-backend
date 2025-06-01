import { PunchClock } from "../../domain/entities/PunchClock";
import { IPunchClockRepository } from "../../domain/repository/IPunchClockRepository";

export class InMemoryPunchClockRepository implements IPunchClockRepository {
  private punchClocks: PunchClock[] = [];

  async register(punchClock: PunchClock): Promise<{ timestamp: Date }> {
    this.punchClocks.push(punchClock);
    return { timestamp: punchClock.timestamp };
  }

  async getByUserId(userId: string): Promise<PunchClock[]> {
    const punchHistory = this.punchClocks.filter(
      (punch) => punch.userId === userId
    );
    return punchHistory;
  }

  async findByFilters(input: {
    adminId: string;
    employeeId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<PunchClock[]> {
    let filtered = this.punchClocks;
    if (input.employeeId) {
      filtered = filtered.filter((r) => r.userId === input.employeeId);
    }
    if (input.startDate) {
      filtered = filtered.filter((r) => r.timestamp >= input.startDate!);
    }
    if (input.endDate) {
      filtered = filtered.filter((r) => r.timestamp <= input.endDate!);
    }
    return filtered;
  }
}
