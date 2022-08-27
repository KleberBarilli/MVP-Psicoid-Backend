import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowPacientService from '../../../services/ShowPacientService';

export default class ShowPacientController {
	public async show(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const showPacient = container.resolve(ShowPacientService);
			const pacient = await showPacient.execute(id);
			return res.status(200).json({ data: pacient });
		} catch (error) {
			return res
				.status(400)
				.json({ message: 'Houve um erro ao buscar o usuário' });
		}
	}
}
