import { Request, Response } from 'express';
import CreateSessionsService from '../../../services/CreateSessionService';
import { container } from 'tsyringe';

export default class SessionsController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		const createSession = container.resolve(CreateSessionsService);

		const user = await createSession.execute({
			email: email.toLowerCase(),
			password,
		});

		return res.json(user);
	}
}
