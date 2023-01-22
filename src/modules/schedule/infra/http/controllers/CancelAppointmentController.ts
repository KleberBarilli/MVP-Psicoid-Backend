import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CancelAppointmentService } from "@modules/schedule/services/CancelAppointmentService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { AppointmentCompletedBy } from "@prisma/client";

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

			await service.execute({
				appointmentId: Number(id),
				closedBy: profile as AppointmentCompletedBy,
				reason,
				profileId,
			});

			res.status(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case "P2002":
						if (
							(error.meta?.target as string[]).includes(
								"appointment_id",
							)
						) {
							return res.status(409).json({
								error: "Você não pode cancelar o mesmo agendamento duas vezes.",
							});
						}
						break;
				}
			}
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
