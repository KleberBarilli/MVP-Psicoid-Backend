import { ICreateUser } from '../../../domain/models/ICreateClient';
import { IUserCreated } from '../../../domain/models/IClientCreated';
import { IUser } from '../../../domain/models/IClient';
import { IUsersRepository } from '../../../domain/repositories/IClientsRepository';
import { PrismaClient } from '@prisma/client';

export default class UsersRepository implements IUsersRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
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

	public async findMe(
		email: string,
		param: string | null,
	): Promise<IUser | undefined | null> {
		return await this.usersRepository.findOne({ email }).select(param);
	}

	public async findById(id: string): Promise<IUser | undefined | null> {
		return await this.usersRepository.findById(id);
	}
	public async findOne(query: any): Promise<IUser | undefined | null> {
		return await this.usersRepository.findOne(query);
	}

	public async findAll(): Promise<IUser[] | null> {
		return await this.usersRepository.find();
	}
}
