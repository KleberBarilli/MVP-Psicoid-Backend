import { ICreateLog } from "@modules/log/domain/models/ICreateLog";
import { ILogsRepository } from "@modules/log/domain/repositories/ILogsRepository";
import logModel from "../entities/LogMongo";

export default class LogsRepository implements ILogsRepository {
	public createOnMongo({
		profile,
		profileId,
		method,
		path,
		data,
	}: ICreateLog): Promise<any> {
		profile = profile.toLowerCase() + "Id";
		return logModel.create({
			[profile]: profileId,
			method,
			route: path,
			data,
		});
	}
}
