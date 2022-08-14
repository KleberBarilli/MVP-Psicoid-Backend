import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { validateLogin } from '@validators/Credentials';
import CreateSessionService from '../../../services/CreateSessionService';
export default class SessionsController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email, password } = request.body;

		try {
			await validateLogin({ email, password });

			const createSession = container.resolve(CreateSessionService);

			const user = await createSession.execute({
				email,
				password,
			});
			return response.json(user);
		} catch (err) {
			return response.status(400).json({ error: 'Error with login' });
		}
	}
}
