import { injectable, inject } from "tsyringe";
import { IPacientsRepository } from "../domain/repositories/IPacientsRepository";

import { IPacient } from "../domain/models/IPacient";

@injectable()
export default class ShowPacientService {
	constructor(
		@inject("PacientsRepository")
		private pacientsRepository: IPacientsRepository,
	) {}
	public async execute(id: string): Promise<IPacient | null> {
		return await this.pacientsRepository.findById(id);
	}
}
