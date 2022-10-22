import { Request, Response } from "express";
import { container } from "tsyringe";
import ListCustomersByPsicoService from "../../../services/ListCustomersByPsicoService";

export default class ListCustomersByPsicoController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { profileId } = req.user;
			const { pagination } = req;
			const service = container.resolve(ListCustomersByPsicoService);
			const [count, customers] = await service.execute(profileId, pagination);
			return res
				.status(200)
				.json({ message: "Meus customeres listados com sucesso", data: count, customers });
		} catch (error) {
			return res.status(500).json({ error: "Houve um erro ao listar os meus customeres" });
		}
	}
}
