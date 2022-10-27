import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ShowCustomerService from '../../../services/ShowCustomerService'

export default class ShowCustomerController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const service = container.resolve(ShowCustomerService)
			const customer = await service.execute(id)
			return res.status(200).json({ data: customer })
		} catch (error) {
			return res.status(400).json({ error: 'Houve um erro ao buscar o usuário' })
		}
	}
}
