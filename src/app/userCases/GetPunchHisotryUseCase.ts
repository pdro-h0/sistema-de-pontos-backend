import { GetPunchHisotryDTO } from "../../communication/request/GetPunchHisotryDTO";
import { GetPunchHisotryResponseDTO } from "../../communication/response/GetPunchHisotryResponseDTO";
import { IPunchClockRepository } from "../../domain/repository/IPunchClockRepository";

export class GetPunchHisotryUseCase {
  constructor(private readonly punchClockRepo: IPunchClockRepository) {}

  async execute(
    input: GetPunchHisotryDTO
  ): Promise<GetPunchHisotryResponseDTO> {
    if (!input.userId) throw new Error("Unauthorized");
    const punchHistory = await this.punchClockRepo.getHistory(input.userId);
    return punchHistory;
  }
}
