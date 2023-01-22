import { ICreateLog } from "../models/ICreateLog";
export interface ILogsRepository {
	createOnMongo(data: ICreateLog): Promise<any>;
}
