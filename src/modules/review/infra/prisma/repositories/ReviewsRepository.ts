import { prisma } from "@shared/prisma";
import { IReviewsRepository } from "../../../domain/repositories/IReviewsRepository";
import { ICreateReview } from "@modules/review/domain/models/ICreateReview";
import { IReview } from "@shared/interfaces/IReview";
import { IUpdateReview } from "@modules/review/domain/models/IUpdateReview";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import {
	ICreateLikeResponse,
	ILike,
	IRemoveLikeResponse,
} from "@modules/review/domain/models/ILike";

export class ReviewsRepository implements IReviewsRepository {
	public create(data: ICreateReview): Promise<IReview> {
		return prisma.review.create({ data });
	}
	public findById(id: number): Promise<IReview | null> {
		return prisma.review.findUnique({
			where: { id },
			include: {
				customer: { include: { profile: true } },
				psychologist: { include: { profile: true } },
				_count: true,
			},
		});
	}
	public async findAllByPsico(
		psicoId: number,
		{ skip, take, sort, order, filter }: IPagination,
	): Promise<number & any> {
		return Promise.all([
			prisma.review.count({
				where: { psychologistId: psicoId, ...filter },
			}),
			prisma.review.findMany({
				where: { psychologistId: psicoId, ...filter },
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
		return prisma.review.update({
			where: { id },
			data: { comment, rating },
		});
	}
	public remove(id: number): Promise<IReview> {
		return prisma.review.delete({ where: { id } });
	}
	public findOne(
		psychologistId: number,
		customerId: number,
	): Promise<IReview | null> {
		return prisma.review.findFirst({
			where: { psychologistId, customerId },
		});
	}
	public addLike(
		reviewId: number,
		customerId: number,
	): Promise<ICreateLikeResponse> {
		return prisma.like.create({
			data: {
				review: { connect: { id: reviewId } },
				customer: { connect: { id: customerId } },
			},
			select: {
				review: { select: { psychologistId: true } },
				customerId: true,
				likedAt: true,
				reviewId: true,
			},
		});
	}
	public removeLike(
		reviewId: number,
		customerId: number,
	): Promise<IRemoveLikeResponse> {
		return prisma.like.delete({
			where: { reviewId_customerId: { reviewId, customerId } },
			select: { review: { select: { psychologistId: true } } },
		});
	}
	public findLike(
		reviewId: number,
		customerId: number,
	): Promise<ILike | null> {
		return prisma.like.findFirst({
			where: { reviewId, customerId },
		});
	}
}
