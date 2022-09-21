import { injectable, inject } from "tsyringe";
import { IPacientCreated } from "../domain/models/IPacientCreated";
import { IPacientsRepository } from "../domain/repositories/IPacientsRepository";
import PsychologistsRepository from "@modules/psico/infra/prisma/repositories/PsychologistsRepository";
import { IAddPsychologist } from "../domain/models/IAddPsychologist";

@injectable()
export default class AddPsychologistService {
	constructor(
		@inject("PacientsRepository")
		public pacientsRepository: IPacientsRepository,
		@inject("PsychologistsRepository")
		public psychologistsRepository: PsychologistsRepository,
	) {}
	public async execute({
		pacientId,
		psychologistId,
	}: IAddPsychologist): Promise<IPacientCreated> {
		return this.pacientsRepository.addPsychologist(pacientId, psychologistId);
	}
}
