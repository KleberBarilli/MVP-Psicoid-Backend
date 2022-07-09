import { ICreateUser } from '../models/ICreateUser';
import { IUserCreated } from '../models/IUserCreated';

export interface IUsersRepository {
	create(data: ICreateUser): Promise<IUserCreated>;
}
