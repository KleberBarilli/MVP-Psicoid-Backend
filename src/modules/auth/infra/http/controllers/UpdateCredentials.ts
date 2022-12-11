import { UpdateCredentialsService } from "@modules/auth/services/UpdateCredentials";
import { AppError } from "@shared/errors/AppError";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateCredentialsController {
	public async handle(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;
		const { id, profileId } = req.user;
		try {
			const updateCredentials = container.resolve(
				UpdateCredentialsService,
			);

			await updateCredentials.execute({
				credentialId: id,
				profileId,
				email,
				password,
			});

			return res.status(204).json();
		} catch (error) {
			if (error instanceof AppError) {
				return sendBadRequest(
					req,
					res,
					error.message,
					error.statusCode,
				);
			}
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}
}
