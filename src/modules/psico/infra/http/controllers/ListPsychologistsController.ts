import ListPsychologistsService from "@modules/psico/services/ListPsychologistsService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import NodeGeocoder from "node-geocoder";
export default class ListPsychologistsController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { pagination } = req;
			const service = container.resolve(ListPsychologistsService);
			const [count, psychologists] = await service.listAll(pagination);

			// const geocoder = NodeGeocoder({ provider: "google" });
			//	{{ _.psico_id_local_url }}/psico/?page=1&limit=4&sort=createdAt&order=desc&filter={"identity": {"address":{"city": "muliteRno","mode":"insensitive"}}}
			// const response = await geocoder.geocode("muliterno");

			//console.log(response);
			return res.status(200).json({ count, data: psychologists });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ error: "Houve um erro ao listar" });
		}
	}
}
