import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ShowReviewService } from "../../../services/ShowReviewService";

export class ShowReviewController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params;
			const service = container.resolve(ShowReviewService);
			const review = await service.execute(id);
			res.status(HTTP_STATUS_CODE.OK).json({ data: review });
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Houve um erro ao buscar a review" });
		}
	}
}
