import { injectable, inject } from "tsyringe";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";
import { IReview } from "../domain/models/IReview";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

@injectable()
export default class ListReviewsByPsicoService {
	constructor(
		@inject("ReviewsRepository")
		public reviewsRepository: IReviewsRepository,
	) {}
	public async execute(
		id: string,
		pagination: IPagination,
	): Promise<IReview[]> {
		return await this.reviewsRepository.findAllByPsico(id, pagination);
	}
}
