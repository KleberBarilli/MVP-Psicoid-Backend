import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowApproachService } from "../../../services/ShowApproachService";

export class ShowApproachController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;

			const service = container.resolve(ShowApproachService);
			const approach = await service.execute(Number(id));
			return res.status(HTTP_STATUS_CODE.OK).json({ data: approach });
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Houve um erro ao buscar a abordagem" });
		}
	}
}
