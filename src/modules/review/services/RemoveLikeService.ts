import { injectable, inject } from "tsyringe";
import { ILike } from "../domain/models/ILike";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";

@injectable()
export default class RemoveLikeService {
	constructor(
		@inject("ReviewsRepository")
		private reviewsRepository: IReviewsRepository,
	) {}
	public async execute(reviewId: string, customerId: string): Promise<ILike> {
		return this.reviewsRepository.removeLike(reviewId, customerId);
	}
}
