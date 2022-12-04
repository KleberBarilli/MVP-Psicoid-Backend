import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { InviteCustomerService } from "../../../services/InviteCustomerService";

export class InviteCustomerController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profileId } = req.user;
			const { name, email } = req.body;

			const service = container.resolve(InviteCustomerService);

			await service.execute({ name, email, psychologistId: profileId });

			res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
