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
	findById(id: string): Promise<IReview | null>;
	findAllByPsico(
		id: string,
		{ skip, take, sort, order, filter }: IPagination,
	): Promise<number & any>;
	remove(id: string): Promise<IReview>;
	findOne(
		psychologistId: string,
		customerId: string,
	): Promise<IReview | null>;
	addLike(reviewId: string, customerId: string): Promise<ICreateLikeResponse>;
	removeLike(
		reviewId: string,
		customerId: string,
	): Promise<IRemoveLikeResponse>;
	findLike(reviewId: string, customerId: string): Promise<ILike | null>;
}
