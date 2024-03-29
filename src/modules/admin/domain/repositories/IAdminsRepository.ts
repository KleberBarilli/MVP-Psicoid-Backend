import { IAdminCreated } from "../models/IAdminCreated";
import { ICreateAdmin } from "../models/ICreateAdmin";

export interface IAdminsRepository {
	create(data: ICreateAdmin): Promise<IAdminCreated>;
}
