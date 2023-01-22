import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AddLikeService } from "@modules/review/services/AddLikeService";
import { AppError } from "@shared/errors/AppError";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class AddLikeController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { reviewId } = req.params;
			const { profileId } = req.user;

			const service = container.resolve(AddLikeService);
			const review = await service.execute(Number(reviewId), profileId);

			res.status(HTTP_STATUS_CODE.CREATED).json({
				message: "Like adicionado com sucesso",
				data: review,
			});
			next();
		} catch (error) {
			if (error instanceof AppError) {
				return sendBadRequest(
					req,
					res,
					error.message,
					error.statusCode,
				);
			}
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
