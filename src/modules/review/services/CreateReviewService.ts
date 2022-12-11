import { IRedisCache } from "@shared/cache/IRedisCache";
import { AppError } from "@shared/errors/AppError";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { ICreateReview } from "../domain/models/ICreateReview";
import { IReviewCreated } from "../domain/models/IReviewCreated";
import { IReviewsRepository } from "../domain/repositories/IReviewsRepository";

@injectable()
export class CreateReviewService {
	constructor(
		@inject("ReviewsRepository")
		private reviewsRepository: IReviewsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute({
		customerId,
		psychologistId,
		rating,
		comment,
	}: ICreateReview): Promise<IReviewCreated> {
		const review = await this.reviewsRepository.findOne(
			psychologistId,
			customerId,
		);
		//Um paciente não pode fazer uma review de um psicologo que ele nunca teve uma consulta
		if (review) {
			throw new AppError("Você já realizou uma avaliação");
		}
		const createReview = await this.reviewsRepository.create({
			customerId,
			psychologistId,
			rating,
			comment,
		});
		await this.redisCache.invalidate(
			`${RedisKeys.LIST_REVIEWS}:${psychologistId}`,
		);
		await this.redisCache.invalidate(`${RedisKeys.ME}:${customerId}`);

		return createReview;
	}
}
