import { ICreateLog } from "../models/ICreateLog";
import { LogEntity } from "@modules/log/infra/orm/entities/Log";

export interface ILogsRepository {
	createOnMongo(data: ICreateLog): Promise<LogEntity>;
}
