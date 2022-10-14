import { injectable, inject } from "tsyringe";
import { IPacientsRepository } from "../domain/repositories/IPacientsRepository";
import { IPacient } from "../domain/models/IPacient";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

@injectable()
export default class ShowPacientService {
	constructor(
		@inject("PacientsRepository")
		public pacientsRepository: IPacientsRepository,
	) {}
	public async execute(psicoid: string, pagination: IPagination): Promise<IPacient[]> {
		const [count, pacients] = await this.pacientsRepository.findAllByPsico(psicoid, pagination);
		return [count, pacients];
	}
}
