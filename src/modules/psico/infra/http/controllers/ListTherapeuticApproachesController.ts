import { ListTherapeuticApproachesService } from "@modules/psico/services/ListTherapeuticApproachesService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListTherapeuticApproachesController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { pagination } = req;
			const service = container.resolve(ListTherapeuticApproachesService);
			const [count, approaches] = await service.execute(pagination);

			return res
				.status(HTTP_STATUS_CODE.OK)
				.json({ count, data: approaches });
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Houve um erro ao listar" });
		}
	}
}
