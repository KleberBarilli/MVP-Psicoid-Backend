import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAppointmentService } from "@modules/schedule/services//UpdateAppointmentService";
import Queue from "@shared/lib/bull/Queue";
import { TypeNotification } from "@prisma/client";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class UpdateAppointmentController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				appointment: {
					psychologistId,
					customerId,
					price,
					status,
					cancellationReason,
					starts,
					ends,
				},
			} = req.body;
			const { id } = req.params;
			const { profile } = req.user;

			const service = container.resolve(UpdateAppointmentService);

			const startsAt = starts ? new Date(starts) : starts;
			const endsAt = ends ? new Date(ends) : ends;

			await service.execute(id, {
				psychologistId,
				customerId,
				price,
				status,
				startsAt,
				endsAt,
			});

			await Queue.add("CreateNotification", {
				type: TypeNotification.UPDATE_APPOINTMENT,
				data: {
					appointmentId: id,
					psychologistId,
					customerId,
					price,
					status,
					cancellationReason,
					startsAt,
					endsAt,
				},
				views:
					profile === "CUSTOMER"
						? { customerId }
						: { psychologistId },
			});
			res.status(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
