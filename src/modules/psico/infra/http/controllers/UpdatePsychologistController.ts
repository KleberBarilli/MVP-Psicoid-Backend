import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { validateAddress } from "@shared/utils/validators/Address";
import { validateContact } from "@shared/utils/validators/Contact";
import { validateProfile } from "@shared/utils/validators/Profile";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { UpdatePsychologistService } from "@modules/psico/services/UpdatePsychologistService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class UpdatePsychologistController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				psico: { profile, office, resume },
			} = req.body;
			const { profileId } = req.user;
			await Promise.all([
				validateProfile(profile),
				validateContact(profile?.contact),
				validateContact(office?.contact),
				validateAddress(office?.address),
			]);

			const service = container.resolve(UpdatePsychologistService);
			await service.execute({
				id: profileId,
				profile,
				office,
				resume,
			});

			res.status(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
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
			console.log(error);
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
