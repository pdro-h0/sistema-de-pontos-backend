import { GetEmployeeRecordsDTO } from "../../communication/request/GetEmployeeRecordsDTO";
import { PunchClockType } from "../../domain/enums/PunchClockType";
import { IPunchClockRepository } from "../../domain/repository/IPunchClockRepository";

export class GetEmployeeRecordsUseCase {
  constructor(private readonly punchClockRepo: IPunchClockRepository) {}

  async execute(input: GetEmployeeRecordsDTO): Promise<
    {
      employee: string;
      date: string;
      checkIn: string;
      checkOut: string;
      hoursWorked: number;
    }[]
  > {
    if (!input.adminId) throw new Error("Unauthenticated");
    const filtered = await this.punchClockRepo.findByFilters(input);
    const grouped = new Map<
      string,
      { userId: string; date: string; checkIn?: Date; checkOut?: Date }
    >();
    for (const record of filtered) {
      const dataKey = record.timestamp.toISOString().split("T")[0];
      const key = `${record.userId}_${dataKey}`;
      if (!grouped.has(key)) {
        grouped.set(key, { userId: record.userId, date: dataKey });
      }
      const group = grouped.get(key)!;
      if (record.type === PunchClockType.checkIn) {
        if (!group.checkIn || record.timestamp < group.checkIn) {
          group.checkIn = record.timestamp;
        }
      }
      if (record.type === PunchClockType.checkOut) {
        if (!group.checkOut || record.timestamp > group.checkOut) {
          group.checkOut = record.timestamp;
        }
      }
    }
    const result = [];
    for (const [_, group] of grouped) {
      const checkInTime = group.checkIn
        ? group.checkIn.toTimeString().slice(0, 5)
        : "N/A";
      const checkOutTime = group.checkOut
        ? group.checkOut.toTimeString().slice(0, 5)
        : "N/A";
      let hoursWorked = 0;
      if (group.checkIn && group.checkOut) {
        hoursWorked =
          Number(group.checkOut.toISOString().split("T")[1].split(":")[0]) -
          Number(group.checkIn.toISOString().split("T")[1].split(":")[0]);
      }
      result.push({
        employee: `Employee ${group.userId}`,
        date: group.date,
        checkIn: checkInTime,
        checkOut: checkOutTime,
        hoursWorked: Math.floor(Number(hoursWorked.toFixed(2))),
      });
    }
    return result;
  }
}
