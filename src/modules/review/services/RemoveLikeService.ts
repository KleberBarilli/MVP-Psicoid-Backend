import { injectable, inject } from "tsyringe";
import { ILike } from "../domain/models/ILike";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";

@injectable()
export default class RemoveLikeService {
	constructor(
		@inject("ReviewsRepository")
		public reviewsRepository: IReviewsRepository,
	) {}
	public async execute(reviewId: string, pacientId: string): Promise<ILike> {
		return this.reviewsRepository.removeLike(reviewId, pacientId);
	}
}
