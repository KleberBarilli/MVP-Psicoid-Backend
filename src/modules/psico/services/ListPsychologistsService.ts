/* eslint-disable no-console */
import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IPsychologist } from "../domain/models/IPsychologist";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { getKmDistance } from "@shared/lib/distance";
import { IReview } from "@shared/interfaces/IReview";
import { arrAvg } from "@shared/utils/etc";
import { RedisKeys } from "@shared/utils/enums";
import { IRedisCache } from "@shared/cache/IRedisCache";

@injectable()
export class ListPsychologistsService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute(
		profileId: string,
		pagination: IPagination,
	): Promise<IPsychologist[]> {
		const { latitude, longitude } = pagination;

		const psicoCache = await this.redisCache.recover<any>(
			`${RedisKeys.LIST_PSICO}:${JSON.stringify(
				pagination.search,
			)}:${profileId}`,
		);


		let count = psicoCache ? psicoCache[0] : undefined;
		let psychologists = psicoCache ? psicoCache[1] : undefined;

		if (!psicoCache) {
			[count, psychologists] = await this.psychologistsRepository.findAll(
				pagination,
			);

			await this.redisCache.save(
				`${RedisKeys.LIST_PSICO}:${JSON.stringify(
					pagination.search,
				)}:${profileId}`,
				[count, psychologists],
			);
		}

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
