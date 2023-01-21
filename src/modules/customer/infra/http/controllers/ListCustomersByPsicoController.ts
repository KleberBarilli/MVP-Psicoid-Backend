import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCustomersByPsicoService } from "../../../services/ListCustomersByPsicoService";

export class ListCustomersByPsicoController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { profileId } = req.user;
			const { pagination } = req;
			const service = container.resolve(ListCustomersByPsicoService);
			const { count, customers } = await service.execute({
				psicoId: profileId,
				pagination,
			});

			return res.status(HTTP_STATUS_CODE.OK).json({
				message: "Pacientes listados com sucesso",
				count,
				data: {
					customers,
				},
			});
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Houve um erro ao listar os meus customeres" });
		}
	}
}
