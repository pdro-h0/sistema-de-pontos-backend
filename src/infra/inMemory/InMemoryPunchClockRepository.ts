import { PunchClock } from "../../domain/entities/PunchClock";
import { PunchClockType } from "../../domain/enums/PunchClockType";
import { IPunchClockRepository } from "../../domain/repository/IPunchClockRepository";

export class InMemoryPunchClockRepository implements IPunchClockRepository {
  private punchClocks: PunchClock[] = [];

  async register(punchClock: PunchClock): Promise<{ timestamp: Date }> {
    this.punchClocks.push(punchClock);
    return { timestamp: punchClock.timestamp };
  }

  async getHistory(
    userId: string
  ): Promise<
    | { date: string; checkIn: string; checkOut: string; hoursWorked: number }[]
    | []
  > {
    const punchHistory = this.punchClocks.filter(
      (punch) => punch.userId === userId
    );
    const groupedByDate: Record<
      string,
      { date: string; checkIn: string; checkOut: string; hoursWorked: number }
    > = {};
    for (const punch of punchHistory) {
      const date = punch.timestamp.toISOString().split("T")[0];
      const time = punch.timestamp.toISOString().split("T")[1].split(".")[0];
      if (!groupedByDate[date]) {
        groupedByDate[date] = {
          date,
          checkIn: "",
          checkOut: "",
          hoursWorked: 0,
        };
      }
      if (punch.type === PunchClockType.checkIn) {
        groupedByDate[date].checkIn = time;
      } else if (punch.type === PunchClockType.checkOut) {
        groupedByDate[date].checkOut = time;
      }
    }
    const history = Object.entries(groupedByDate).map(([date, data]) => {
      let hoursWorked = 0;
      if (data.checkIn && data.checkOut) {
        const diffMs =
          Number(data.checkOut.split(":")[0]) -
          Number(data.checkIn.split(":")[0]);
        hoursWorked = diffMs;
      }
      return {
        date,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        hoursWorked,
      };
    });
    return history;
  }

  async getByUserId(userId: string): Promise<PunchClock[]> {
    const punchHistory = this.punchClocks.filter(
      (punch) => punch.userId === userId
    );
    return punchHistory;
  }
}
