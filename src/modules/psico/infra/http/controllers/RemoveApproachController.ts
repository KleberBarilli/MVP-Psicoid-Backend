import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import RemoveApproachService from '../../../services/RemoveApproachService'

export default class RemoveApproachController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { approachId } = req.query
			const { profileId } = req.user

			const service = container.resolve(RemoveApproachService)
			const user = await service.execute(approachId?.toString() || '', profileId)

			res.status(204).json({
				message: 'Abordagem Removida com sucesso',
				data: user,
			})
			next()
		} catch (error) {
			return res.status(500).json({ error: 'Internal Error' })
		}
	}
}
