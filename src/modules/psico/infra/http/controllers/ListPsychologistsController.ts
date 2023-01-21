import { ListPsychologistsService } from "@modules/psico/services/ListPsychologistsService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
export class ListPsychologistsController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { pagination, user } = req;

			const service = container.resolve(ListPsychologistsService);
			const { count, psychologists } = await service.execute({
				profileId: user.profileId,
				pagination,
			});

			res.status(HTTP_STATUS_CODE.OK).json({
				count,
				data: psychologists,
			});
			next();
		} catch (error) {
			console.log(error);
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Houve um erro ao listar" });
		}
	}
}
