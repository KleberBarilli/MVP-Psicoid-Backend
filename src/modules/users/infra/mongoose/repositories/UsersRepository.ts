import { ICreateUser } from '../../../domain/models/ICreateUser';
import { Model } from 'mongoose';
import { IUsersRepository } from '../../../domain/repositories/IUsersRepository';
import { User } from '../schemas/User';

export default class UsersRepository implements IUsersRepository {
	private model;
	constructor() {
		this.model = User;
	}

	public async create({ name, email, password }: ICreateUser): Promise<any> {
		const user = this.model.create({ name, email, password });

		await this.model.save(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		await this.model.save(user);

		return user;
	}

	public async findByName(name: string): Promise<User | undefined> {
		const user = await this.model.findOne({
			where: {
				name,
			},
		});
		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = await this.model.findOne({
			where: {
				id,
			},
		});
		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.model.findOne({
			where: {
				email,
			},
		});
		return user;
	}

	public async findAll(): Promise<User[]> {
		const users = await this.model.find();

		return users;
	}
}
