import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowCustomerService } from "../../../services/ShowCustomerService";

export class ShowCustomerController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const service = container.resolve(ShowCustomerService);
			const customer = await service.execute(id);
			return res.status(HTTP_STATUS_CODE.OK).json({ data: customer });
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Houve um erro ao buscar o usuário" });
		}
	}
}
