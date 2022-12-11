import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationError } from "yup";
import { validateContact } from "@shared/utils/validators/Contact";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { CreateGuestService } from "../../../services/CreateGuestService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class CreateGuestCustomerController {
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

			res.status(HTTP_STATUS_CODE.CREATED).json({
				message: "Guest Customer created with success",
				data: user,
			});
			next();
		} catch (error) {
			if (error instanceof ValidationError) {
				return sendBadRequest(
					req,
					res,
					error.message,
					HTTP_STATUS_CODE.BAD_REQUEST,
				);
			}
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
