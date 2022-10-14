import { injectable, inject } from "tsyringe";
import { ICreateGuestPacient } from "../domain/models/ICreateGuestPacient";
import { IPacientCreated } from "../domain/models/IPacientCreated";
import { IPacientsRepository } from "../domain/repositories/IPacientsRepository";

@injectable()
export default class CreatePacientService {
	constructor(
		@inject("PacientsRepository")
		public pacientsRepository: IPacientsRepository,
	) {}
	public async execute(
		psicoId: string,
		{ name, contact }: ICreateGuestPacient,
	): Promise<IPacientCreated> {
		return await this.pacientsRepository.createGuest(psicoId, {
			name,
			contact,
		});
	}
}
