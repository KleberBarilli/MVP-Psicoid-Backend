import AppError from '../../../shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateClient';
import { IUserCreated } from '../domain/models/IClientCreated';
import { IUsersRepository } from '../domain/repositories/IClientsRepository';
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
		const userExists = await this.usersRepository.findOne({ email });
		if (userExists) {
			throw new AppError('User already exists');
		}
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
