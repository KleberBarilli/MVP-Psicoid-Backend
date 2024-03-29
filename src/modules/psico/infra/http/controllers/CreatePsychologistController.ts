import { Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { validateCredentials } from "@shared/utils/validators/Credentials";
import { validateAddress } from "@shared/utils/validators/Address";
import { validateContact } from "@shared/utils/validators/Contact";
import { validateProfile } from "@shared/utils/validators/Profile";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { CreatePsychologistService } from "../../../services/CreatePsychologistService";
import { CreateSessionService } from "@modules/auth/services/CreateSessionService";
import { AppError } from "@shared/errors/AppError";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class CreatePsychologistController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				psico: { credentials, profile, office, resume },
			} = req.body;
			await Promise.all([
				validateCredentials(credentials),
				validateProfile(profile),
				validateContact(profile.contact),
				validateContact(office.contact),
				validateAddress(office.address),
			]);
			const password = credentials.password;
			const service = container.resolve(CreatePsychologistService);
			const user = await service.execute({
				credential: credentials,
				profile,
				office,
				resume,
			});
			const sessionService = container.resolve(CreateSessionService);
			const session = await sessionService.execute({
				email: credentials.email.toLowerCase(),
				password,
			});
			return res.status(HTTP_STATUS_CODE.CREATED).json({
				message: "Psychologist created with success",
				data: { user, session },
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					return res.status(HTTP_STATUS_CODE.CONFLICT).json({
						error: "Já existe um CPF ou CNPJ igual cadastrado no sistema.",
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
			if (error instanceof AppError) {
				return sendBadRequest(
					req,
					res,
					error.message,
					error.statusCode,
				);
			}
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error });
		}
	}
}
