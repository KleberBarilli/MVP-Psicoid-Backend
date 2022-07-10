import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';
import { validarCadastro } from '../../../validators/UsersValidators';

export default class UsersController {
	public async create(req: Request, res: Response): Promise<Response> {
		req.body.email = req.body.email.toLowerCase();

		const userValidated = await validarCadastro(req.body);
		const createUser = container.resolve(CreateUserService);
		const user = await createUser.execute(userValidated);

		return res.json({ data: user, message: 'User Created' });
	}
}
