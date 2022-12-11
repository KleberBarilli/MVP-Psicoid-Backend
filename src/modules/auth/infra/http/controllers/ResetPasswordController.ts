import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordService } from "@modules/auth/services/ResetPasswordService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class ResetPasswordController {
	public async handle(req: Request, res: Response): Promise<Response> {
		const { password, token } = req.body;

		const resetPassword = container.resolve(ResetPasswordService);

		await resetPassword.execute({
			password,
			token,
		});

		return res.status(HTTP_STATUS_CODE.NO_CONTENT);
	}
}
