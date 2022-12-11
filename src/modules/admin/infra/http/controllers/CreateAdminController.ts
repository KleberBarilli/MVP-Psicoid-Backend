import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { validateCredentials } from "@shared/utils/validators/Credentials";
import { validateProfile } from "@shared/utils/validators/Profile";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { CreateAdminService } from "../../../services/CreateAdminService";
import { CreateSessionService } from "@modules/auth/services/CreateSessionService";

export class CreateAdminController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				admin: { credentials, profile },
			} = req.body;
			credentials.email = credentials.email.toLowerCase();
			await Promise.all([
				validateCredentials(credentials),
				validateProfile(profile),
			]);
			const password = credentials.password;
			const service = container.resolve(CreateAdminService);
			const user = await service.execute({
				credential: credentials,
				profile,
			});

			const sessionService = container.resolve(CreateSessionService);
			const session = await sessionService.execute({
				email: credentials.email.toLowerCase(),
				password,
			});
			res.status(201).json({
				message: "Admin created with success",
				data: { user, session },
			});
			next();
		} catch (error) {
			console.log(error);
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
