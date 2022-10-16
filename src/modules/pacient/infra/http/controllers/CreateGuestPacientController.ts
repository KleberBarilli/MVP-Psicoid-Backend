import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { validateContact } from "@shared/utils/validators/Contact";
import { sendBadRequest } from "@shared/errors/BadRequest";
import CreateGuestPacientService from "../../../services/CreateGuestPacientService";

export default class CreateGuestPacientController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				guestPacient: { name, contact },
			} = req.body;
			const { profileId } = req.user;
			await validateContact(contact);

			const service = container.resolve(CreateGuestPacientService);
			const user = await service.execute(profileId, {
				name,
				contact,
			});

			res.status(201).json({
				message: "Guest Pacient created with success",
				data: user,
			});
			next();
		} catch (error) {
			console.log(error);
			if (error instanceof ValidationError) {
				return sendBadRequest(req, res, error.message, 400);
			}
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
