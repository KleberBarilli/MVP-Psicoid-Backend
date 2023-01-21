import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";

@injectable()
export class ShowApproachService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
	) {}
	public async execute(id: bigint): Promise<any> {
		return await this.psychologistsRepository.findOneApproach(id);
	}
}
