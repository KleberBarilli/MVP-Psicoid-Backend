import { ICreateUser } from '../../../domain/models/ICreateUser';
import { IUserCreated } from '../../../domain/models/IUserCreated';
import { IUsersRepository } from '../../../domain/repositories/IUsersRepository';
import { UsersModel } from '../schemas/User';
export default class UsersRepository implements IUsersRepository {
	private usersRepository: IUsersRepository;
	constructor() {
		this.usersRepository = UsersModel;
	}

	public async create({
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
