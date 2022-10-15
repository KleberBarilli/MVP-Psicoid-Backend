import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateAppointmentService from "@modules/schedule/services/CreateAppointmentService";

export default class CreateAppointmentController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				appointment: { psychologistId, pacientId, createdBy, price, starts, ends },
			} = req.body;

			const service = container.resolve(CreateAppointmentService);
			const startsAt = new Date(starts);
			const endsAt = new Date(ends);

			const appointment = await service.execute({
				psychologistId,
				pacientId,
				createdBy,
				price,
				startsAt,
				endsAt,
			});

			return res.status(201).json({
				message: "Appointment adicionado com sucesso",
				data: appointment,
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
