import { injectable, inject } from "tsyringe";
import { IUpdateReview } from "../domain/models/IUpdateReview";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";
import { IReview } from "@shared/interfaces/IReview";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";

@injectable()
export class UpdateReviewService {
	constructor(
		@inject("ReviewsRepository")
		private reviewsRepository: IReviewsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute({
		id,
		rating,
		comment,
	}: IUpdateReview): Promise<void> {
		const review = await this.reviewsRepository.update({
			id,
			rating,
			comment,
		});

		await this.redisCache.invalidate(
			`${RedisKeys.LIST_REVIEWS}:${review.psychologistId}`,
		);
		await this.redisCache.invalidate(
			`${RedisKeys.ME}:${review.customerId}`,
		);
	}
}
