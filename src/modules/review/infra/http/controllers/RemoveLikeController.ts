import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import RemoveLikeService from '@modules/review/services/RemoveLikeService'

export default class RemoveLikeController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { reviewId } = req.params
			const { profileId } = req.user

			const service = container.resolve(RemoveLikeService)
			const review = await service.execute(reviewId, profileId)

			res.status(204).json({
				message: 'Like removido com sucesso',
				data: review,
			})
			next()
		} catch (error) {
			return res.status(500).json({ error: 'Internal Error' })
		}
	}
}
