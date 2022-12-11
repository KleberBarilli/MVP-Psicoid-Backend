import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";

@injectable()
export default class RemoveLikeService {
	constructor(
		@inject("ReviewsRepository")
		private reviewsRepository: IReviewsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute(reviewId: string, customerId: string): Promise<void> {
		const deslike = await this.reviewsRepository.removeLike(
			reviewId,
			customerId,
		);

		await this.redisCache.invalidate(
			`${RedisKeys.LIST_REVIEWS}:${deslike.review.psychologistId}`,
		);
		await this.redisCache.invalidate(`${RedisKeys.ME}:${customerId}`);
	}
}
