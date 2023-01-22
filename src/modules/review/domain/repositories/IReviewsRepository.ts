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
	findById(id: number): Promise<IReview | null>;
	findAllByPsico(
		id: number,
		{ skip, take, sort, order, filter }: IPagination,
	): Promise<number & any>;
	remove(id: number): Promise<IReview>;
	findOne(
		psychologistId: number,
		customerId: number,
	): Promise<IReview | null>;
	addLike(reviewId: number, customerId: number): Promise<ICreateLikeResponse>;
	removeLike(
		reviewId: number,
		customerId: number,
	): Promise<IRemoveLikeResponse>;
	findLike(reviewId: number, customerId: number): Promise<ILike | null>;
}
