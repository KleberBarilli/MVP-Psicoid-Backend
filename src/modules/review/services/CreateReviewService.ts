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
	public execute({
		pacientId,
		psychologistId,
		rating,
		comment,
	}: ICreateReview): Promise<IReviewCreated> {
		return this.reviewsRepository.create({ pacientId, psychologistId, rating, comment });
	}
}
