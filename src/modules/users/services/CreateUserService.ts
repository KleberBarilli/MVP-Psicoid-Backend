import AppError from '../../../shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUserCreated } from '../domain/models/IUserCreated';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreateUserService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}
	public async execute({
		name,
		email,
		password,
	}: ICreateUser): Promise<IUserCreated> {
		const hashedPassword = await this.hashProvider.generateHash(
			password || '',
		);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}
