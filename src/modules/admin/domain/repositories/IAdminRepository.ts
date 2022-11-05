import { IAdminCreated } from '../models/IAdminCreated'
import { ICreateAdmin } from '../models/ICreateAdmin'

export interface IAdminRepository {
	create(data: ICreateAdmin): Promise<IAdminCreated>
}
