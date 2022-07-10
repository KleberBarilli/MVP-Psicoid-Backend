import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;
		const mail = email.toLowerCase();

		const createUser = container.resolve(CreateUserService);
		const user = await createUser.execute({
			name,
			email: mail,
			password,
		});

		return res.json(user);
	}
}
