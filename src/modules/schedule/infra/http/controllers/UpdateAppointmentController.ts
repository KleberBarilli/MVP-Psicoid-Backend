import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateAppointmentService from "@modules/schedule/services//UpdateAppointmentService";

export default class UpdateAppointmentController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				appointment: {
					psychologistId,
					pacientId,
					price,
					status,
					cancellationReason,
					starts,
					ends,
				},
			} = req.body;
			const { id } = req.params;

			const service = container.resolve(UpdateAppointmentService);

			const startsAt = starts ? new Date(starts) : starts;
			const endsAt = ends ? new Date(ends) : ends;

			const appointment = await service.execute(id, {
				psychologistId,
				pacientId,
				price,
				status,
				cancellationReason,
				startsAt,
				endsAt,
			});

			return res.status(201).json({
				message: "Appointment atualizado com sucesso",
				data: appointment,
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
