import { GetPunchHisotryDTO } from "../../communication/request/GetPunchHisotryDTO";
import { GetPunchHisotryResponseDTO } from "../../communication/response/GetPunchHisotryResponseDTO";
import { PunchClockType } from "../../domain/enums/PunchClockType";
import { IPunchClockRepository } from "../../domain/repository/IPunchClockRepository";

export class GetPunchHisotryUseCase {
  constructor(private readonly punchClockRepo: IPunchClockRepository) {}

  async execute(
    input: GetPunchHisotryDTO
  ): Promise<GetPunchHisotryResponseDTO> {
    if (!input.userId) throw new Error("Unauthorized");
    const punchHistory = await this.punchClockRepo.getByUserId(input.userId);
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
}
