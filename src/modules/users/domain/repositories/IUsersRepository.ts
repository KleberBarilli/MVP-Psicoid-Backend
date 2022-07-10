import { ICreateUser } from '../models/ICreateUser';
import { IUserCreated } from '../models/IUserCreated';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
	create(data: ICreateUser): Promise<IUserCreated>;
	findByEmail(email: string): Promise<IUser | undefined | null>;
	findById(id: string): Promise<IUser | undefined | null>;
	findAll(): Promise<IUser[] | null>;
}
