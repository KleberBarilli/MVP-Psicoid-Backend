import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IPsychologist } from "../domain/models/IPsychologist";

@injectable()
export default class ListPsychologistsService {
	constructor(
		@inject("PsychologistsRepository")
		public psychologistsRepository: IPsychologistsRepository,
	) {}
	public async listAll(): Promise<IPsychologist[]> {
		return await this.psychologistsRepository.findAll();
	}
	public async listByCity(city: string): Promise<IPsychologist[]> {
		return await this.psychologistsRepository.findByCity(city);
	}
}
