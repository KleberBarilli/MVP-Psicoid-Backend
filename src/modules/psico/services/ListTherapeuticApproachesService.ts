/* eslint-disable no-console */
import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { ITherapeuticApproache } from "@shared/interfaces/IApproache";

@injectable()
export default class ListTherapeuticApproachesService {
	constructor(
		@inject("PsychologistsRepository")
		public psychologistsRepository: IPsychologistsRepository,
	) {}
	public async execute(pagination: IPagination): Promise<ITherapeuticApproache[]> {
		const [count, approaches] = await this.psychologistsRepository.findAllApproaches(
			pagination,
		);
		return [count, approaches];
	}
}
