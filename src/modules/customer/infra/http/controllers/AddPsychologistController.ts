import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import AddPsychologistService from "@modules/customer/services/AddPsychologistService";
import Queue from "@shared/lib/bull/Queue";
import { TypeNotification } from "@prisma/client";

export default class AddPsychologistController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profileId } = req.user;
			const { psychologistId, selected } = req.body;

			const service = container.resolve(AddPsychologistService);
			await service.execute({
				customerId: profileId,
				psychologistId,
				selected,
			});

			await Queue.add("CreateNotification", {
				type: TypeNotification.CUSTOMER_ADD_PSICO,
				data: { customerId: profileId, psychologistId, selected },
				views: { psychologistId },
			});
			res.status(200).json({
				message: "Adicionado com sucesso",
			});
			next();
		} catch (error) {
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
