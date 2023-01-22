import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ShowAppointmentService } from "@modules/schedule/services/ShowAppointmentService";

import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class ShowAppointmentController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params;

			const service = container.resolve(ShowAppointmentService);

			const appointment = await service.execute(Number(id));

			res.status(HTTP_STATUS_CODE.OK).json({ data: appointment });
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
