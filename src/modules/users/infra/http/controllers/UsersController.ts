import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
	public async create(req: Request, res: Response): Promise<Response> {
		console.log('alo');
		const { name, email, password } = req.body;

		const createUser = container.resolve(CreateUserService);

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		return res.json(instanceToInstance(user));
	}
}
