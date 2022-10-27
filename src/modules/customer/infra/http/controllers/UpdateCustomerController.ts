import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ValidationError } from 'yup'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { validateContact } from '@shared/utils/validators/Contact'
import { validateUpdateProfile } from '@shared/utils/validators/Profile'
import { sendBadRequest } from '@shared/errors/BadRequest'
import UpdateCustomerService from '@modules/customer/services/UpdateCustomerService'

export default class UpdateCustomerController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				customer: { profile, contact, selectedPsychologistId },
			} = req.body
			const { profileId } = req.user
			await Promise.all([validateUpdateProfile(profile), validateContact(contact)])

			const service = container.resolve(UpdateCustomerService)
			const user = await service.execute(profileId, {
				profile,
				contact,
				selectedPsychologistId,
			})

			return res.status(204).json({
				message: 'Customer updated with success',
				data: user,
			})
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					return res.status(400).json({
						error: 'Já existe um CPF igual cadastrado no sistema.',
					})
				}
			}
			if (error instanceof ValidationError) {
				return sendBadRequest(req, res, error.message, 400)
			}
			return res.status(500).json({ error: 'Internal Error' })
		}
	}
}
