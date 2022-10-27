import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateReviewService from '@modules/review/services/CreateReviewService'
import { validateReview } from '@shared/utils/validators/Review'
import { sendBadRequest } from '@shared/errors/BadRequest'
import { ValidationError } from 'yup'
import AppError from '@shared/errors/AppError'
import Queue from '@shared/lib/bull/Queue'
import { TypeNotification } from '@prisma/client'

export default class CreateReviewController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				review: { rating, comment },
			} = req.body
			const { psychologistId } = req.query
			const { profileId } = req.user

			await validateReview({ rating, comment })

			const service = container.resolve(CreateReviewService)
			const review = await service.execute({
				customerId: profileId,
				psychologistId: psychologistId?.toString() || '',
				rating,
				comment,
			})
			await Queue.add('CreateNotification', {
				type: TypeNotification.CREATE_REVIEW,
				data: {
					customerId: profileId,
					psychologistId,
					rating,
					comment,
				},
				views: { psychologistId },
			})

			res.status(201).json({
				message: 'Review adicionada com sucesso',
				data: review,
			})
			next()
		} catch (error) {
			if (error instanceof AppError) {
				return sendBadRequest(req, res, error.message, error.statusCode)
			}
			if (error instanceof ValidationError) {
				return sendBadRequest(req, res, error.message, 400)
			}
			return res.status(500).json({ error: 'Internal Error' })
		}
	}
}
