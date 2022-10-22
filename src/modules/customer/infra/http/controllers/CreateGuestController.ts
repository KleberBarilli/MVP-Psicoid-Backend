import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { validateContact } from "@shared/utils/validators/Contact";
import { sendBadRequest } from "@shared/errors/BadRequest";
import CreateGuestService from "../../../services/CreateGuestService";

export default class CreateGuestCustomerController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				guest: { name, contact },
			} = req.body;
			const { profileId } = req.user;
			await validateContact(contact);

			const service = container.resolve(CreateGuestService);
			const user = await service.execute(profileId, {
				name,
				contact,
			});

			res.status(201).json({
				message: "Guest Customer created with success",
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
