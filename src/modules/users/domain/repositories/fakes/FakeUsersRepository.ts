import { ICreateUser } from '../../models/ICreateUser';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UsersModel } from '../../../infra/mongoose/schemas/User';
import { IUser } from '../../models/IUser';

export default class FakeUsersRepository implements IUsersRepository {
	private users: IUser[] = [];

	public async create({
		name,
		email,
		password,
	}: ICreateUser): Promise<IUser> {
		const user = new UsersModel();

		// user._id = new mongoose.Types.ObjectId();
		user.name = name;
		user.email = email;
		user.password = password;

		this.users.push(user);

		return user;
	}

	// public async save(user: User): Promise<User> {
	// 	const findIndex = this.users.findIndex(
	// 		findUser => findUser.id === user.id,
	// 	);

	// 	this.users[findIndex] = user;

	// 	return user;
	// }

	public async findOne(query: any): Promise<IUser | undefined> {
		const user = this.users.find(user => query);
		return user;
	}
	public async findByEmail(email: string): Promise<IUser | undefined> {
		const user = this.users.find(user => user.email === email);

		return user;
	}

	public async findById(id: string): Promise<IUser | undefined> {
		const user = this.users.find(user => user._id === id);
		return user;
	}

	public async findMe(
		email: string,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		param: string,
	): Promise<IUser | undefined | null> {
		const user = this.users.find(user => user.email === email);
		return user;
	}

	public async findAll(): Promise<IUser[] | null> {
		return null;
	}
}
