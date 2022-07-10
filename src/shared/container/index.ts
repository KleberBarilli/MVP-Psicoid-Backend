import { container } from 'tsyringe';
import { IUsersRepository } from '../../modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/mongoose/repositories/UsersRepository';
import '../../modules/users/providers';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);
