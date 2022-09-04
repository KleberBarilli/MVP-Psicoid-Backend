import { Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { validateUpdateAddress } from "@shared/utils/validators/Address";
import { validateContact } from "@shared/utils/validators/Contact";
import { validateUpdateIdentity } from "@shared/utils/validators/Identity";
import { sendBadRequest } from "@shared/errors/BadRequest";
import UpdatePsychologistService from "@modules/psico/services/UpdatePsychologistService";

export default class UpdatePsychologistController {
	public async update(req: Request, res: Response): Promise<Response> {
		try {
			const {
				psico: { identity, contact, address, office, resume },
			} = req.body;
			const { id } = req.params;
			await Promise.all([
				validateUpdateIdentity(identity),
				validateContact(contact),
				validateUpdateAddress(address),
			]);

			const service = container.resolve(UpdatePsychologistService);
			const user = await service.execute(id, {
				identity,
				contact,
				address,
				office,
				resume,
			});

			return res.status(204).json({
				data: user,
				message: "Psychologist updated with success",
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					return res.status(400).json({
						error: "Já existe um CPF igual cadastrado no sistema.",
					});
				}
			}
			if (error instanceof ValidationError) {
				return sendBadRequest(req, res, error.message, 400);
			}
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
