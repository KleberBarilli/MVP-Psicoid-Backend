import { Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { validateCredentials } from "@shared/utils/validators/Credentials";
import { validateAddress } from "@shared/utils/validators/Address";
import { validateContact } from "@shared/utils/validators/Contact";
import { validateProfile } from "@shared/utils/validators/Profile";
import { sendBadRequest } from "@shared/errors/BadRequest";
import CreatePsychologistService from "../../../services/CreatePsychologistService";
import AppError from "@shared/errors/AppError";
export default class CreatePsychologistController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				psico: { credentials, profile, office, resume },
			} = req.body;
			credentials.email = credentials.email.toLowerCase();
			await Promise.all([
				validateCredentials(credentials),
				validateProfile(profile),
				validateContact(profile.contact),
				validateContact(office.contact),
				validateAddress(office.address),
			]);
			const service = container.resolve(CreatePsychologistService);
			const user = await service.execute({
				credential: credentials,
				profile,
				office,
				resume,
			});
			return res.status(201).json({
				data: user,
				message: "Psychologist created with success",
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					return res.status(400).json({
						error: "Já existe um CPF ou CNPJ igual cadastrado no sistema.",
					});
				}
			}
			if (error instanceof ValidationError) {
				return sendBadRequest(req, res, error.message, 400);
			}
			if (error instanceof AppError) {
				return sendBadRequest(req, res, error.message, error.statusCode);
			}
			return res.status(500).json({ error });
		}
	}
}
