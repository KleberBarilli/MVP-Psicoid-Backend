import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";
import { IReview } from "@shared/interfaces/IReview";

@injectable()
export class ShowReviewService {
	constructor(
		@inject("ReviewsRepository")
		private reviewsRepository: IReviewsRepository,
	) {}
	public execute(id: string): Promise<IReview | null> {
		return this.reviewsRepository.findById(id);
	}
}
