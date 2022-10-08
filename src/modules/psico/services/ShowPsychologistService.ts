import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { getKmDistance } from "@shared/utils/distance";
@injectable()
export default class ShowPsychologistService {
	constructor(
		@inject("PsychologistsRepository")
		public psychologistsRepository: IPsychologistsRepository,
	) {}
	public async execute(id: string, { latitude, longitude }: any): Promise<any[]> {
		const psico = await this.psychologistsRepository.findById(id);

		const distance = getKmDistance(
			{ latitude, longitude },
			{
				latitude: psico?.office.address.latitude || 0,
				longitude: psico?.office.address.longitude || 0,
			},
		);

		return [psico, distance];
	}
}
