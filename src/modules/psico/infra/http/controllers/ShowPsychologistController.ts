import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import ShowPsychologistService from '../../../services/ShowPsychologistService'

export default class ShowPsychologistController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params
			const { latitude, longitude } = req.query
			const showPsychologist = container.resolve(ShowPsychologistService)
			const [psychologist, distance, avgRating] = await showPsychologist.execute(id, {
				latitude,
				longitude,
			})
			res.status(200).json({ data: { ...psychologist, distance, avgRating } })
			next()
		} catch (error) {
			return res.status(400).json({ error: 'Houve um erro ao buscar o usuário' })
		}
	}
}
