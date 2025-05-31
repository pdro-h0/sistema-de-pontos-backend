import {
  GenerateEmployeesRecordsQueryDTO,
  GenerateEmployeesRecordsHeaderDTO,
} from "../../communication/request/GenerateEmployeesRecordsDTO";
import { PunchClockType } from "../../domain/enums/PunchClockType";
import { IPunchClockRepository } from "../../domain/repository/IPunchClockRepository";
import { IUserRepository } from "../../domain/repository/IUserRepository";

export class GenerateEmployeesRecordsUseCase {
  constructor(
    private readonly punchClockRepo: IPunchClockRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    { endDate, startDate }: GenerateEmployeesRecordsQueryDTO,
    { adminId }: GenerateEmployeesRecordsHeaderDTO
  ) {
    const filtered = await this.punchClockRepo.findByFilters({
      adminId,
      startDate,
      endDate,
    });
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
    let totalHours: number = 0;
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
      const userName = await this.userRepo.findById(group.userId);
      result.push({
        name: userName,
        hoursWorked: Math.floor(Number(hoursWorked.toFixed(2))),
      });
      totalHours = result.reduce((prev, current) => {
        return prev + current.hoursWorked;
      }, 0);
    }
    return {
      totalHours,
      employees: result,
    };
  }
}
