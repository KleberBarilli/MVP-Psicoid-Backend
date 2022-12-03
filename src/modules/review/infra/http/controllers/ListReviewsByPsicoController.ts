import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import ListReviewsByPsicoService from "../../../services/ListReviewsByPsicoService";

export default class ListReviewsByPsicoController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params;
			const { pagination, user } = req;

			const service = container.resolve(ListReviewsByPsicoService);
			const reviews = await service.execute({
				id,
				customerId: user.profileId,
				pagination,
			});

			res.status(HTTP_STATUS_CODE.OK).json({ data: reviews });
			next();
		} catch (error) {
			console.log(error);
			return res
				.status(HTTP_STATUS_CODE.BAD_REQUEST)
				.json({ error: "Houve um erro ao buscar as reviews" });
		}
	}
}
