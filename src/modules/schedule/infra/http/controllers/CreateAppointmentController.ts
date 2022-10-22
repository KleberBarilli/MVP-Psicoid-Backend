import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import CreateAppointmentService from "@modules/schedule/services/CreateAppointmentService";

export default class CreateAppointmentController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				appointment: { psychologistId, customerId, createdBy, price, starts, ends },
			} = req.body;

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
