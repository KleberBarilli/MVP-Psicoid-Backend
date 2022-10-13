import { injectable, inject } from "tsyringe";
import { IPacientsRepository } from "../domain/repositories/IPacientsRepository";
import { IUpdatePacient } from "../domain/models/IUpdatePacient";
import { PacientEntity } from "../infra/prisma/entities/Pacient";

@injectable()
export default class UpdatePacientService {
	constructor(
		@inject("PacientsRepository")
		public pacientsRepository: IPacientsRepository,
	) {}
	public async execute(
		id: string,
		{ identity, contact, selectedPsychologistId }: IUpdatePacient,
	): Promise<PacientEntity> {
		return await this.pacientsRepository.update(id, {
			selectedPsychologistId,
			identity,
			contact,
		});
	}
}
