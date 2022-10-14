import { Request, Response } from "express";
import { container } from "tsyringe";
import ListPacientsByPsicoService from "../../../services/ListPacientsByPsicoService";

export default class ListPacientsByPsicoController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { profileId } = req.user;
			const { pagination } = req;
			const service = container.resolve(ListPacientsByPsicoService);
			const [count, pacients] = await service.execute(profileId, pagination);
			return res
				.status(200)
				.json({ message: "Meus pacientes listados com sucesso", data: count, pacients });
		} catch (error) {
			return res.status(500).json({ error: "Houve um erro ao listar os meus pacientes" });
		}
	}
}
