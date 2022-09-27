import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IPsychologist } from "../domain/models/IPsychologist";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { getKmDistance } from "@shared/utils/distance";
@injectable()
export default class ListPsychologistsService {
	constructor(
		@inject("PsychologistsRepository")
		public psychologistsRepository: IPsychologistsRepository,
	) {}
	public async listAll(pagination: IPagination): Promise<IPsychologist[]> {
		const [count, psychologists] = await this.psychologistsRepository.findAll(pagination);

		psychologists.map((psico: IPsychologist) => {
			psico.distance = getKmDistance(
				{ latitude: -28.327499, longitude: -51.768108 },
				{ latitude: -28.26235, longitude: -52.408989 },
			);

			return psico;
		});

		return [count, psychologists];
	}
}
