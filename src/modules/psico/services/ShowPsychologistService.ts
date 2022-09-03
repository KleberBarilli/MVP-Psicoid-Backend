import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";

import { IPsychologist } from "../domain/models/IPsychologist";

@injectable()
export default class ShowPsychologistService {
	constructor(
		@inject("PsychologistsRepository")
		public psychologistsRepository: IPsychologistsRepository,
	) {}
	public async execute(id: string): Promise<IPsychologist | null> {
		return await this.psychologistsRepository.findById(id);
	}
}
