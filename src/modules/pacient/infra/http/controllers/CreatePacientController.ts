import { Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { validateCredentials } from "@shared/utils/validators/Credentials";
import { validateContact } from "@shared/utils/validators/Contact";
import { validateProfile } from "@shared/utils/validators/Profile";
import { sendBadRequest } from "@shared/errors/BadRequest";
import CreatePacientService from "../../../services/CreatePacientService";
import CreateSessionService from "@modules/auth/services/CreateSessionService";
import AppError from "@shared/errors/AppError";

export default class CreatePacientController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				pacient: { credentials, profile, contact },
			} = req.body;
			credentials.email = credentials.email.toLowerCase();
			await Promise.all([
				validateCredentials(credentials),
				validateProfile(profile),
				validateContact(contact),
			]);

			const service = container.resolve(CreatePacientService);
			const user = await service.execute({
				credential: {
					...credentials,
					email: credentials.email.toLowerCase(),
				},
				profile,
				contact,
			});
			const sessionService = container.resolve(CreateSessionService);
			const session = await sessionService.execute({
				email: credentials.email.toLowerCase(),
				password: credentials.password,
			});
			return res.status(201).json({
				data: { user, session },
				message: "Pacient created with success",
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
			if (error instanceof AppError) {
				return sendBadRequest(req, res, error.message, error.statusCode);
			}
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
