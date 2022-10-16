import AppError from "@shared/errors/AppError";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import DeleteReviewService from "../../../services/DeleteReviewService";

export default class DeleteReviewController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params;
			const { profileId } = req.user;

			const service = container.resolve(DeleteReviewService);
			await service.execute(id, profileId);

			res.status(200).json({ message: "Review removida com sucesso" });
			next();
		} catch (error) {
			if (error instanceof AppError) {
				return sendBadRequest(req, res, error.message, error.statusCode);
			}
			return res.status(500).json({ error: "Houve um erro ao remover a review" });
		}
	}
}
