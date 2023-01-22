import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveLikeService } from "@modules/review/services/RemoveLikeService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class RemoveLikeController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { reviewId } = req.params;
			const { profileId } = req.user;

			const service = container.resolve(RemoveLikeService);
			await service.execute(Number(reviewId), profileId);

			res.status(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
