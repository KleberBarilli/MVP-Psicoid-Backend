import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IPsychologist } from "../domain/models/IPsychologist";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

@injectable()
export default class ListPsychologistsService {
	constructor(
		@inject("PsychologistsRepository")
		public psychologistsRepository: IPsychologistsRepository,
	) {}
	public async listAll(pagination: IPagination): Promise<IPsychologist[]> {
		return await this.psychologistsRepository.findAll(pagination);
	}
}
