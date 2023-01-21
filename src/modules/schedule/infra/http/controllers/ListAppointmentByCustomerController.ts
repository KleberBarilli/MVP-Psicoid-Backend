import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ListAppointmentsByCustomerService } from "@modules/schedule/services/ListAppointmentsByCustomerService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class ListAppointmentsByCustomerController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { pagination, user } = req;

			const service = container.resolve(
				ListAppointmentsByCustomerService,
			);

			const appointments = await service.execute({
				customerId: user.profileId,
				pagination,
			});

			res.status(HTTP_STATUS_CODE.OK).json({ data: appointments });
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
