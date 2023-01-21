import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ListAppointmentsByPsicoService } from "@modules/schedule/services/ListAppointmentsByPsicoService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class ListAppointmentsByPsicoController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { pagination, user } = req;

			const service = container.resolve(ListAppointmentsByPsicoService);

			const appointments = await service.execute({
				psychologistId: user.profileId,
				pagination,
			});

			res.status(HTTP_STATUS_CODE.OK).json({ data: appointments });
			next();
		} catch (error) {
			console.log(error);
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
