import { PrismaClient } from "@prisma/client";
import { IReviewsRepository } from "../../../domain/repositories/IReviewsRepository";
import { ICreateReview } from "@modules/review/domain/models/ICreateReview";
import { IReview } from "@shared/interfaces/IReview";
import { IUpdateReview } from "@modules/review/domain/models/IUpdateReview";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { ILike } from "@modules/review/domain/models/ILike";

export default class ReviewsRepository implements IReviewsRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public create(data: ICreateReview): Promise<IReview> {
		return this.#prisma.review.create({ data });
	}
	public findById(id: string): Promise<IReview | null> {
		return this.#prisma.review.findUnique({
			where: { id },
			include: {
				customer: { include: { profile: true } },
				psychologist: { include: { profile: true } },
				_count: true,
			},
		});
	}
	public async findAllByPsico(
		id: string,
		{ skip, take, sort, order, filter }: IPagination,
	): Promise<number & any> {
		return Promise.all([
			this.#prisma.review.count({ where: { psychologistId: id, ...filter } }),
			this.#prisma.review.findMany({
				where: { psychologistId: id, ...filter },
				orderBy: { [sort]: order },
				skip,
				take,
				include: {
					customer: { include: { profile: true } },
					psychologist: { include: { profile: true } },
					likes: true,
				},
			}),
		]);
	}
	public update({ id, comment, rating }: IUpdateReview): Promise<IReview> {
		return this.#prisma.review.update({ where: { id }, data: { comment, rating } });
	}
	public remove(id: string): Promise<IReview> {
		return this.#prisma.review.delete({ where: { id } });
	}
	public findOne(psychologistId: string, customerId: string): Promise<IReview | null> {
		return this.#prisma.review.findFirst({ where: { psychologistId, customerId } });
	}
	public addLike(reviewId: string, customerId: string): Promise<ILike> {
		return this.#prisma.like.create({
			data: {
				review: { connect: { id: reviewId } },
				customer: { connect: { id: customerId } },
			},
		});
	}
	public removeLike(reviewId: string, customerId: string): Promise<ILike> {
		return this.#prisma.like.delete({
			where: { reviewId_customerId: { reviewId, customerId } },
		});
	}
	public findLike(reviewId: string, customerId: string): Promise<ILike | null> {
		return this.#prisma.like.findFirst({ where: { reviewId, customerId } });
	}
}
