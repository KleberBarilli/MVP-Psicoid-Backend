import { ICreateLog } from "../models/ICreateLog";
import { LogEntity } from "@modules/log/infra/orm/entities/Log";

export interface ILogsRepository {
	createOnPg(data: ICreateLog): Promise<LogEntity>;
	createOnMongo(data: ICreateLog): Promise<LogEntity>;
}
