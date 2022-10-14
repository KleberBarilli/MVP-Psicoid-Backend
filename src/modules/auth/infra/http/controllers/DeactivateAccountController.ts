import { Request, Response } from "express";
import { container } from "tsyringe";
import DeactivateAccountService from "@modules/auth/services/DeactivateAccountService";

export default class DeactivateAccountController {
	public async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.user;
		try {
			const deactivate = container.resolve(DeactivateAccountService);
			await deactivate.execute(id);
			return res.status(204).json({ message: "A conta foi desativada com sucesso" });
		} catch (error) {
			return res.status(400).json({ error: "Erro ao desativar a conta" });
		}
	}
}
