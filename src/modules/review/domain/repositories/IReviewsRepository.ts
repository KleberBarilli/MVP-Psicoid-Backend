import { ICreateReview } from "../models/ICreateReview";
import { IUpdateReview } from "../models/IUpdateReview";
import { IReview } from "@shared/interfaces/IReview";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import {
	ICreateLikeResponse,
	ILike,
	IRemoveLikeResponse,
} from "../models/ILike";

export interface IReviewsRepository {
	create(data: ICreateReview): Promise<IReview>;
	update(data: IUpdateReview): Promise<IReview>;
	findById(id: bigint): Promise<IReview | null>;
	findAllByPsico(
		id: bigint,
		{ skip, take, sort, order, filter }: IPagination,
	): Promise<number & any>;
	remove(id: bigint): Promise<IReview>;
	findOne(
		psychologistId: bigint,
		customerId: bigint,
	): Promise<IReview | null>;
	addLike(reviewId: bigint, customerId: bigint): Promise<ICreateLikeResponse>;
	removeLike(
		reviewId: bigint,
		customerId: bigint,
	): Promise<IRemoveLikeResponse>;
	findLike(reviewId: bigint, customerId: bigint): Promise<ILike | null>;
}
