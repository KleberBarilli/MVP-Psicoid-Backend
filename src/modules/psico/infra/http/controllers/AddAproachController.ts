import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import AddApproachService from '../../../services/AddApproachService'

export default class AddApproachController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { approachId } = req.query
			const { profileId } = req.user

			const service = container.resolve(AddApproachService)
			const user = await service.execute(approachId?.toString() || '', profileId)

			res.status(204).json({
				message: 'Abordagem adicionada com sucesso',
				data: user,
			})
			next()
		} catch (error) {
			return res.status(500).json({ error: 'Internal Error' })
		}
	}
}
