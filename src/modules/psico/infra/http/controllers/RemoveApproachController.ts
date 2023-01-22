import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveApproachService } from "../../../services/RemoveApproachService";

export class RemoveApproachController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params;
			const { profileId } = req.user;

			const service = container.resolve(RemoveApproachService);
			await service.execute(BigInt(id), profileId);

			res.status(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
