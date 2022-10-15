import { Request, Response } from "express";
import { container } from "tsyringe";
import AddLikeService from "@modules/review/services/AddLikeService";
import AppError from "@shared/errors/AppError";
import { sendBadRequest } from "@shared/errors/BadRequest";

export default class AddLikeController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { reviewId } = req.params;
			const { profileId } = req.user;

			const service = container.resolve(AddLikeService);
			const review = await service.execute(reviewId, profileId);

			return res.status(201).json({
				message: "Like adicionado com sucesso",
				data: review,
			});
		} catch (error) {
			console.log(error);
			if (error instanceof AppError) {
				return sendBadRequest(req, res, error.message, error.statusCode);
			}
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
