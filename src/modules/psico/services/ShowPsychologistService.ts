import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { getKmDistance } from "@shared/lib/distance";
import { IReview } from "@shared/interfaces/IReview";
import { arrAvg } from "@shared/utils/etc";
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

		let ratings: number[] = [];
		psico?.reviews.map((review: IReview) => {
			ratings.push(review.rating);
		});

		const avgRating = Math.round(arrAvg(ratings));
		return [psico, distance, avgRating];
	}
}
