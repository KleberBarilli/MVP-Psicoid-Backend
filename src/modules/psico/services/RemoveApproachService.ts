import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IPsychologistShortUpdate } from "../domain/models/IPsychologist";

@injectable()
export default class CreatePsychologistService {
	constructor(
		@inject("PsychologistsRepository")
		public psychologistsRepository: IPsychologistsRepository,
	) {}

	public async execute(id: string, psicoId: string): Promise<IPsychologistShortUpdate> {
		return this.psychologistsRepository.removeApproach(id, psicoId);
	}
}
