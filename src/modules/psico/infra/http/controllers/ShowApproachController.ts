import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowApproachService from "../../../services/ShowApproachService";

export default class ShowApproachController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;

			const service = container.resolve(ShowApproachService);
			const approach = await service.execute(id);
			return res.status(200).json({ data: approach });
		} catch (error) {
			return res.status(400).json({ error: "Houve um erro ao buscar a abordagem" });
		}
	}
}
