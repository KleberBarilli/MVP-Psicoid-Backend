import { Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { validateContact } from "@shared/utils/validators/Contact";
import { validateUpdateProfile } from "@shared/utils/validators/Profile";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { UpdateCustomerService } from "@modules/customer/services/UpdateCustomerService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class UpdateCustomerController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				customer: { profile, contact, selectedPsychologistId },
			} = req.body;
			const { profileId } = req.user;
			await Promise.all([
				validateUpdateProfile(profile),
				validateContact(contact),
			]);

			const service = container.resolve(UpdateCustomerService);
			await service.execute({
				id: profileId,
				profile,
				contact,
				selectedPsychologistId,
			});

			return res.status(HTTP_STATUS_CODE.NO_CONTENT);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					return res.status(HTTP_STATUS_CODE.CONFLICT).json({
						error: "Já existe um CPF igual cadastrado no sistema.",
					});
				}
			}
			if (error instanceof ValidationError) {
				return sendBadRequest(
					req,
					res,
					error.message,
					HTTP_STATUS_CODE.BAD_REQUEST,
				);
			}
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
