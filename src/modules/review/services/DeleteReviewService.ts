import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";
import { AppError } from "@shared/errors/AppError";
import { HTTP_STATUS_CODE, RedisKeys } from "@shared/utils/enums";
import { IRedisCache } from "@shared/cache/IRedisCache";

@injectable()
export class DeleteReviewService {
	constructor(
		@inject("ReviewsRepository")
		private reviewsRepository: IReviewsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute(id: number, customerId: number): Promise<void> {
		const review = await this.reviewsRepository.findById(id);
		if (review?.customerId !== customerId) {
			throw new AppError({
				message: "Você não pode apagar um comentário de outra pessoa",
				statusCode: HTTP_STATUS_CODE.CONFLICT,
			});
		}
		await this.reviewsRepository.remove(id);

		await this.redisCache.invalidate(
			`${RedisKeys.LIST_REVIEWS}:${review.psychologistId}`,
		);
		await this.redisCache.invalidate(`${RedisKeys.ME}:${customerId}`);
	}
}
