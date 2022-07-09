import AppError from '../../../shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUserCreated } from '../domain/models/IUserCreated';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}
	public async execute({
		name,
		email,
		password,
	}: ICreateUser): Promise<IUserCreated> {
		const user = await this.usersRepository.create({
			name,
			email,
			password,
		});

		return user;
	}
}
