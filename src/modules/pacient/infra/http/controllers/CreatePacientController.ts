import { Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { validateCredentials } from "@shared/utils/validators/Credentials";
import { validateContact } from "@shared/utils/validators/Contact";
import { validateIdentity } from "@shared/utils/validators/Identity";
import { sendBadRequest } from "@shared/errors/BadRequest";
import CreatePacientService from "../../../services/CreatePacientService";
import AppError from "@shared/errors/AppError";

export default class PacientController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				pacient: { credentials, identity, contact },
			} = req.body;
			credentials.email = credentials.email.toLowerCase();
			await Promise.all([
				validateCredentials(credentials),
				validateIdentity(identity),
				validateContact(contact),
			]);

			const createPacient = container.resolve(CreatePacientService);
			const user = await createPacient.execute({
				credential: {
					...credentials,
					email: credentials.email.toLowerCase(),
				},
				identity,
				contact,
			});

			return res.status(201).json({
				data: user,
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
