import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { DeactivateAccountService } from "@modules/auth/services/DeactivateAccountService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class DeactivateAccountController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const { id } = req.user;
		try {
			const deactivate = container.resolve(DeactivateAccountService);
			await deactivate.execute(id);
			res.status(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Erro ao desativar a conta" });
		}
	}
}
