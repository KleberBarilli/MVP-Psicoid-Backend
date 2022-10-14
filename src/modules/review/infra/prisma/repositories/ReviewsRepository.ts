import { PrismaClient } from "@prisma/client";
import { IReviewsRepository } from "../../../domain/repositories/IReviewsRepository";
import { ICreateReview } from "@modules/review/domain/models/ICreateReview";
import { IReview } from "@shared/interfaces/IReview";
import { IUpdateReview } from "@modules/review/domain/models/IUpdateReview";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

export default class PacientsRepository implements IReviewsRepository {
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
				pacient: { include: { profile: true } },
				psychologist: { include: { profile: true } },
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
					pacient: { include: { profile: true } },
					psychologist: { include: { profile: true } },
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
}
