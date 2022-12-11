import { Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { validateCredentials } from "@shared/utils/validators/Credentials";
import { validateContact } from "@shared/utils/validators/Contact";
import { validateProfile } from "@shared/utils/validators/Profile";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { CreateCustomerService } from "../../../services/CreateCustomerService";
import { CreateSessionService } from "@modules/auth/services/CreateSessionService";
import { AppError } from "@shared/errors/AppError";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class CreateCustomerController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				customer: { credentials, profile, contact },
			} = req.body;
			credentials.email = credentials.email.toLowerCase();
			await Promise.all([
				validateCredentials(credentials),
				validateProfile(profile),
				validateContact(contact),
			]);

			const service = container.resolve(CreateCustomerService);
			const user = await service.execute({
				credential: {
					password: credentials.password,
					email: credentials.email.toLowerCase(),
					role: credentials.role,
				},
				profile,
				contact,
			});
			const sessionService = container.resolve(CreateSessionService);
			const session = await sessionService.execute({
				email: credentials.email.toLowerCase(),
				password: credentials.password,
			});
			return res.status(HTTP_STATUS_CODE.CREATED).json({
				message: "Customer created with success",
				data: { user, session },
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					return res.status(HTTP_STATUS_CODE.CONFLICT).json({
						error: "Já existe um CPF igual cadastrado no sistema.",
					});
				}
			}
			if (error instanceof ValidationError) {
				return sendBadRequest(req, res, error.message, 400);
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
				.json({ error: "Internal Error" });
		}
	}
}
