import { PunchClock } from "../../domain/entities/PunchClock";
import { IPunchClockRepository } from "../../domain/repository/IPunchClockRepository";
import { db } from "../../lib/prisma";

export class PrismaPunchClockRepository implements IPunchClockRepository {
  async register(punchClock: PunchClock): Promise<{ timestamp: Date }> {
    const punchClockCreated = await db.punchClock.create({
      data: {
        timestamp: punchClock.timestamp,
        type: punchClock.type as any,
        userId: punchClock.userId,
      },
    });
    return {
      timestamp: punchClockCreated.timestamp,
    };
  }

  async getHistory(
    userId: string
  ): Promise<
    | { date: string; checkIn: string; checkOut: string; hoursWorked: number }[]
    | []
  > {
    throw new Error("Method not implemented.");
  }

  async getByUserId(userId: string): Promise<PunchClock[]> {
    return await db.punchClock.findMany({
      where: {
        userId,
      },
    });
  }

  async getAll(): Promise<PunchClock[]> {
    throw new Error("Method not implemented.");
  }

  async findByFilters(input: {
    adminId: string;
    employeeId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<PunchClock[]> {
    throw new Error("Method not implemented.");
  }
}
