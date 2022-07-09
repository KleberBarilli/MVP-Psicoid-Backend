import { Model } from 'mongoose';
import { IUsersRepository } from '../../../domain/repositories/IUsersRepository';
import { User, userSchema } from '../schemas/User';

export class UsersRepository implements IUsersRepository {
	private _usersRepository: Model<User>;
	private _populateOnFind: string[];

	constructor(repository: Model<T>, populateOnFind: string[] = []) {
		this._usersRepository = repository;
		this._populateOnFind = populateOnFind;
	}

	getAll(): Promise<T[]> {
		return this._repository.find().populate(this._populateOnFind).exec();
	}

	get(id: any): Promise<T> {
		return this._repository
			.findById(id)
			.populate(this._populateOnFind)
			.exec();
	}

	create(item: T): Promise<T> {
		return this._repository.create(item);
	}

	update(id: string, item: T) {
		return this._repository.findByIdAndUpdate(id, item);
	}
}
