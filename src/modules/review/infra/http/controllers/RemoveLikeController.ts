import { Request, Response } from "express";
import { container } from "tsyringe";
import RemoveLikeService from "@modules/review/services/RemoveLikeService";

export default class RemoveLikeController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { reviewId } = req.params;
			const { profileId } = req.user;

			const service = container.resolve(RemoveLikeService);
			const review = await service.execute(reviewId, profileId);

			return res.status(204).json({
				message: "Like removido com sucesso",
				data: review,
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
