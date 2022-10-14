import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { ICreateReview } from "../domain/models/ICreateReview";
import { IReviewCreated } from "../domain/models/IReviewCreated";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";

@injectable()
export default class CreateReviewService {
	constructor(
		@inject("ReviewsRepository")
		public reviewsRepository: IReviewsRepository,
	) {}
	public async execute({
		pacientId,
		psychologistId,
		rating,
		comment,
	}: ICreateReview): Promise<IReviewCreated> {
		const review = await this.reviewsRepository.findOne(psychologistId, pacientId);

		if (review) {
			throw new AppError("Você já realizou uma avaliação");
		}
		return this.reviewsRepository.create({ pacientId, psychologistId, rating, comment });
	}
}
