/* eslint-disable no-console */
import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IPsychologist } from "../domain/models/IPsychologist";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { getKmDistance } from "@shared/lib/distance";
import { IReview } from "@shared/interfaces/IReview";
import { arrAvg } from "@shared/utils/etc";
@injectable()
export default class ListPsychologistsService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
	) {}
	public async execute(pagination: IPagination): Promise<IPsychologist[]> {
		const { latitude, longitude } = pagination;

		const [count, psychologists] =
			await this.psychologistsRepository.findAll(pagination);
		let ratings: number[] = [];
		psychologists.map((psico: IPsychologist) => {
			psico.distance = getKmDistance(
				{ latitude, longitude },
				{
					latitude: psico.office.address.latitude || 0,
					longitude: psico.office.address.longitude || 0,
				},
			);

			psico.reviews.map((review: IReview) => {
				ratings.push(review.rating);
			});

			psico.avgRating = Math.round(arrAvg(ratings));
			return psico;
		});

		return [count, psychologists];
	}
}
