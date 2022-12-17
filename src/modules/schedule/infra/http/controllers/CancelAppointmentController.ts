import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CancelAppointmentService } from "@modules/schedule/services/CancelAppointmentService";
import Queue from "@shared/lib/bull/Queue";
import { TypeNotification } from "@prisma/client";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class CancelAppointmentController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { reason } = req.body;
			const { id } = req.params;
			const { profile, profileId } = req.user;

			const service = container.resolve(CancelAppointmentService);

			const canceled = await service.execute({
				appointmentId: id,
				closedBy: profile,
				reason,
			});

			await Queue.add("CreateNotification", {
				type: TypeNotification.CANCEL_APPOINTMENT,
				data: {
					appointmentId: id,
					psychologistId: canceled.appointment.psychologistId,
					customerId: canceled.appointment.customerId,
					cancellationReason:
						canceled.appointment.closedAppointment
							?.cancellationReason,
				},
				views:
					profile === "CUSTOMER"
						? { customerId: profileId }
						: { psychologistId: profileId },
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
