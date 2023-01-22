import { IRedisCache } from "@shared/cache/IRedisCache";
import { AppError } from "@shared/errors/AppError";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";

@injectable()
export class AddLikeService {
	constructor(
		@inject("ReviewsRepository")
		private reviewsRepository: IReviewsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute(reviewId: string, customerId: bigint): Promise<void> {
		const like = await this.reviewsRepository.findLike(
			reviewId,
			customerId,
		);

		if (like) {
			throw new AppError({
				message: "Você já deu like nesse comentário",
				statusCode: 409,
			});
		}

		const liked = await this.reviewsRepository.addLike(
			reviewId,
			customerId,
		);

		await this.redisCache.invalidate(
			`${RedisKeys.LIST_REVIEWS}:${liked.review.psychologistId}`,
		);
		await this.redisCache.invalidate(`${RedisKeys.ME}:${customerId}`);
	}
}
