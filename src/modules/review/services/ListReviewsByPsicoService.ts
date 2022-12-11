import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";
import { IReview } from "../domain/models/IReview";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";

interface IRequest {
	psicoId: string;
	customerId: string;
	pagination: IPagination;
}
@injectable()
export default class ListReviewsByPsicoService {
	constructor(
		@inject("ReviewsRepository")
		private reviewsRepository: IReviewsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private async findReviews({ psicoId, customerId, pagination }: IRequest) {
		const [, reviews] = await this.reviewsRepository.findAllByPsico(
			psicoId,
			pagination,
		);

		reviews.map((review: { likes: any[]; isLiked: boolean }) => {
			const isLiked = review.likes.some(
				(like: { customerId: string }) =>
					like.customerId === customerId,
			);
			isLiked ? (review.isLiked = true) : (review.isLiked = false);
		});
		await this.redisCache.save(
			`${RedisKeys.LIST_REVIEWS}:${psicoId}`,
			reviews,
		);

		return reviews;
	}
	public async execute({
		psicoId,
		customerId,
		pagination,
	}: IRequest): Promise<IReview[]> {
		let reviewsInCache = await this.redisCache.recover<IReview[]>(
			`${RedisKeys.LIST_REVIEWS}:${psicoId}`,
		);
		if (reviewsInCache) {
			return reviewsInCache;
		}
		return this.findReviews({ psicoId, customerId, pagination });
	}
}
