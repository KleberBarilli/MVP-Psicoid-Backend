import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import CreateAppointmentService from "@modules/schedule/services/CreateAppointmentService";
import Queue from "@shared/lib/bull/Queue";
import { TypeNotification } from "@prisma/client";

export default class CreateAppointmentController {
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
					createdBy,
					price,
					starts,
					ends,
				},
			} = req.body;
			const { profile } = req.user;
			const service = container.resolve(CreateAppointmentService);
			const startsAt = new Date(starts);
			const endsAt = new Date(ends);

			const appointment = await service.execute({
				psychologistId,
				customerId,
				createdBy,
				price,
				startsAt,
				endsAt,
			});
			await Queue.add("CreateNotification", {
				type: TypeNotification.CREATE_APPOINTMENT,
				data: {
					psychologistId,
					customerId,
					createdBy,
					price,
					startsAt,
					endsAt,
				},
				views:
					profile === "CUSTOMER"
						? { customerId }
						: { psychologistId },
			});
			res.status(201).json({
				message: "Appointment adicionado com sucesso",
				data: appointment,
			});
			next();
		} catch (error) {
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
