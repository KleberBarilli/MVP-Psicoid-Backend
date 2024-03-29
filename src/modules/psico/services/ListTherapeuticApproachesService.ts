/* eslint-disable no-console */
import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { ITherapeuticApproaches } from "@shared/interfaces/IApproaches";

@injectable()
export class ListTherapeuticApproachesService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
	) {}
	public async execute(
		pagination: IPagination,
	): Promise<ITherapeuticApproaches[]> {
		const [count, approaches] =
			await this.psychologistsRepository.findAllApproaches(pagination);
		return [count, approaches];
	}
}
