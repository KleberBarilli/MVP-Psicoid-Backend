import AppError from '@shared/errors/AppError'
import { sendBadRequest } from '@shared/errors/BadRequest'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import HandleAllNotificationService from '../../../services/HandleAllViewsNotificationService'

export default class HandleAllNotificationController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profile, profileId } = req.user
			const { action } = req.params

			const service = container.resolve(HandleAllNotificationService)

			await service.execute(
				profile,
				profileId,
				action.toUpperCase() === 'DELETE' ? true : false,
			)
			res.status(200).json({ message: 'Notificações atualizadas com sucesso' })
			next()
		} catch (error) {
			if (error instanceof AppError) {
				return sendBadRequest(req, res, error.message, error.statusCode)
			}
			return res.status(500).json({ error: 'Houve um erro interno' })
		}
	}
}
