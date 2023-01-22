import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateReviewService } from "@modules/review/services/CreateReviewService";
import { validateReview } from "@shared/utils/validators/Review";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { ValidationError } from "yup";
import { AppError } from "@shared/errors/AppError";
import Queue from "@shared/lib/bull/Queue";
import { TypeNotification } from "@prisma/client";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class CreateReviewController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				review: { rating, comment, psychologistId },
			} = req.body;

			const { profileId } = req.user;

			await validateReview({ rating, comment });

			const service = container.resolve(CreateReviewService);
			const review = await service.execute({
				customerId: profileId,
				psychologistId: Number(psychologistId),
				rating,
				comment,
			});
			await Queue.add("CreateNotification", {
				type: TypeNotification.CREATE_REVIEW,
				data: {
					customerId: profileId,
					psychologistId,
					rating,
					comment,
				},
				views: { psychologistId },
			});

			res.status(HTTP_STATUS_CODE.CREATED).json({
				message: "Review adicionada com sucesso",
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
			if (error instanceof ValidationError) {
				return sendBadRequest(
					req,
					res,
					error.message,
					HTTP_STATUS_CODE.BAD_REQUEST,
				);
			}
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
