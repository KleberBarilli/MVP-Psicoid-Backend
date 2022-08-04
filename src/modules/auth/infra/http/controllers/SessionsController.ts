import { Request, Response } from 'express';
import { validateLogin } from '../../../../../shared/utils/validators/Credentials';
import { container } from 'tsyringe';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email, password } = request.body;

		try {
			await validateLogin({ email, password });

			const createSession = container.resolve(CreateSessionsService);

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
