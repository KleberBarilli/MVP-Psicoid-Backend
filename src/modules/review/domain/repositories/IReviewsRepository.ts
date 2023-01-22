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
		psychologistId: string,
		customerId: bigint,
	): Promise<IReview | null>;
	addLike(reviewId: string, customerId: bigint): Promise<ICreateLikeResponse>;
	removeLike(
		reviewId: string,
		customerId: bigint,
	): Promise<IRemoveLikeResponse>;
	findLike(reviewId: string, customerId: bigint): Promise<ILike | null>;
}
