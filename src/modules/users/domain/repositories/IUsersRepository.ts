import { ICreateUser } from '../models/ICreateUser';
import { IUserCreated } from '../models/IUserCreated';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
	create(data: ICreateUser): Promise<IUserCreated>;
	findMe(
		email: string,
		param: string | null,
	): Promise<IUser | undefined | null>;
	findById(id: string): Promise<IUser | undefined | null>;
	findAll(): Promise<IUser[] | null>;
	findOne(query: any): Promise<IUser | undefined | null>;
}
