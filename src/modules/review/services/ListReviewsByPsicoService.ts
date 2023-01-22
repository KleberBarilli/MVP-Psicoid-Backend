import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";
import { IReview } from "../domain/models/IReview";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";

interface IRequest {
	psicoId: bigint;
	customerId: bigint;
	pagination: IPagination;
}

interface ISaveRedisCache {
	psicoId: bigint;
	reviews: any;
}

interface IHandleLiked {
	customerId: bigint;
	reviews: any;
}
@injectable()
export class ListReviewsByPsicoService {
	constructor(
		@inject("ReviewsRepository")
		private reviewsRepository: IReviewsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private async getReviewFromCache({ psicoId }: { psicoId: bigint }) {
		return this.redisCache.recover<IReview[]>(
			`${RedisKeys.LIST_REVIEWS}:${psicoId}`,
		);
	}
	private async saveRedisCache({ psicoId, reviews }: ISaveRedisCache) {
		return this.redisCache.save(
			`${RedisKeys.LIST_REVIEWS}:${psicoId}`,
			reviews,
		);
	}

	private async handleLiked({ customerId, reviews }: IHandleLiked) {
		const mappedReviews = reviews.map(
			(review: { likes: { customerId: bigint }[]; isLiked: boolean }) => {
				const isLiked = review.likes.some(
					(like: { customerId: bigint }) =>
						like.customerId === customerId,
				);
				isLiked ? (review.isLiked = true) : (review.isLiked = false);

				return review;
			},
		);

		return mappedReviews;
	}

	private async findReviews({ psicoId, customerId, pagination }: IRequest) {
		const [, reviews] = await this.reviewsRepository.findAllByPsico(
			psicoId,
			pagination,
		);

		const reviewsMapped = await this.handleLiked({ customerId, reviews });

		await this.saveRedisCache({ psicoId, reviews: reviewsMapped });

		return reviews;
	}
	public async execute({
		psicoId,
		customerId,
		pagination,
	}: IRequest): Promise<IReview[]> {
		const reviewsInCache = await this.getReviewFromCache({ psicoId });

		if (reviewsInCache) {
			return reviewsInCache;
		}
		return this.findReviews({ psicoId, customerId, pagination });
	}
}
