import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";
import { IReview } from "@shared/interfaces/IReview";

@injectable()
export default class DeleteReviewService {
	constructor(
		@inject("ReviewsRepository")
		public reviewsRepository: IReviewsRepository,
	) {}
	public execute(id: string): Promise<IReview | null> {
		return this.reviewsRepository.remove(id);
	}
}