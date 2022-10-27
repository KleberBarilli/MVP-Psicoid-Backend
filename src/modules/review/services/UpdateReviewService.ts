import { injectable, inject } from 'tsyringe'
import { IUpdateReview } from '../domain/models/IUpdateReview'
import { IReviewsRepository } from '../domain/repositories/IReviewsRepository'
import { IReview } from '@shared/interfaces/IReview'

@injectable()
export default class UpdateReviewService {
	constructor(
		@inject('ReviewsRepository')
		public reviewsRepository: IReviewsRepository,
	) {}
	public execute({ id, rating, comment }: IUpdateReview): Promise<IReview> {
		return this.reviewsRepository.update({ id, rating, comment })
	}
}
