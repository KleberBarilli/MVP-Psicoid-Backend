import { PrismaClient } from "@prisma/client";
import { IReviewsRepository } from "../../../domain/repositories/IReviewsRepository";
import { IAddReview } from "@modules/pacient/domain/models/IAddReview";
import { IReview } from "@shared/interfaces/IReview";
import { IUpdateReview } from "@modules/pacient/domain/models/IUpdateReview";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

export default class PacientsRepository implements IReviewsRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public create(data: IAddReview): Promise<IReview> {
		return this.#prisma.review.create({ data });
	}
	public findById(id: string): Promise<IReview | null> {
		return this.#prisma.review.findUnique({ where: { id } });
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
			}),
		]);
	}
	public update({ id, comment, rating }: IUpdateReview): Promise<IReview> {
		return this.#prisma.review.update({ where: { id }, data: { comment, rating } });
	}
	public remove(id: string): Promise<IReview> {
		return this.#prisma.review.delete({ where: { id } });
	}
}
