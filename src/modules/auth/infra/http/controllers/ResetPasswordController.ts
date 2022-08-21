import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/auth/services/ResetPasswordService';

export default class ResetPasswordController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { password, token } = req.body;

		const resetPassword = container.resolve(ResetPasswordService);

		await resetPassword.execute({
			userId: req.user.id,
			password,
			token,
		});

		return res.status(204).json();
	}
}