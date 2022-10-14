import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";
import { IReview } from "@shared/interfaces/IReview";
import AppError from "@shared/errors/AppError";

@injectable()
export default class DeleteReviewService {
	constructor(
		@inject("ReviewsRepository")
		public reviewsRepository: IReviewsRepository,
	) {}
	public async execute(id: string, pacientId: string): Promise<IReview | null> {
		const review = await this.reviewsRepository.findById(id);
		if (review?.pacientId !== pacientId) {
			throw new AppError("Você não pode apagar um comentário de outra pessoa", 409);
		}
		return this.reviewsRepository.remove(id);
	}
}
