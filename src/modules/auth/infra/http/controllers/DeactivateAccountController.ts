import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import DeactivateAccountService from "@modules/auth/services/DeactivateAccountService";

export default class DeactivateAccountController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const { id } = req.user;
		try {
			const deactivate = container.resolve(DeactivateAccountService);
			await deactivate.execute(id);
			res.status(204).json({ message: "A conta foi desativada com sucesso" });
			next();
		} catch (error) {
			return res.status(400).json({ error: "Erro ao desativar a conta" });
		}
	}
}
