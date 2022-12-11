import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";
import { IReview } from "../domain/models/IReview";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { IRedisCache } from "@shared/cache/IRedisCache";

interface IRequest {
	id: string;
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
	public async execute({
		id,
		customerId,
		pagination,
	}: IRequest): Promise<IReview[]> {
		// let reviews = await this.redisCache.recover<IReview[]>()

		// [, reviews] = await this.reviewsRepository.findAllByPsico(
		// 	id,
		// 	pagination,
		// );

		reviews.map((review: { likes: any[]; isLiked: boolean }) => {
			const isLiked = review.likes.some(
				(like: { customerId: string }) =>
					like.customerId === customerId,
			);
			isLiked ? (review.isLiked = true) : (review.isLiked = false);
		});

		return reviews;
	}
}
