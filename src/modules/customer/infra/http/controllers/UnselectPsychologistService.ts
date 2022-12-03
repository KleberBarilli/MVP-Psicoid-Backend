import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import UnselectPsychologistService from "@modules/customer/services/UnselectPsychologistService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export default class UnselectPsychologistController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profileId } = req.user;

			const service = container.resolve(UnselectPsychologistService);
			await service.execute(profileId);

			res.status(HTTP_STATUS_CODE.NO_CONTENT).json({
				message: "OK",
			});
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
