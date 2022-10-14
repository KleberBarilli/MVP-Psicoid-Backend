import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { ILikeCreated } from "../domain/models/ILikeCreated";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";

@injectable()
export default class AddLikeService {
	constructor(
		@inject("ReviewsRepository")
		public reviewsRepository: IReviewsRepository,
	) {}
	public async execute(reviewId: string, pacientId: string): Promise<ILikeCreated> {
		const like = await this.reviewsRepository.findLike(reviewId, pacientId);

		if (like) {
			throw new AppError("Você já deu like nesse comentário", 409);
		}

		return this.reviewsRepository.addLike(reviewId, pacientId);
	}
}
