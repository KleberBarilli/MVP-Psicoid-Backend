import { ICreateLog } from "@modules/log/domain/models/ICreateLog";
import { ILogsRepository } from "@modules/log/domain/repositories/ILogsRepository";
import { PrismaClient } from "@prisma/client";
import { LogEntity } from "../entities/Log";

export default class LogsRepository implements ILogsRepository {
	#prisma;

	constructor() {
		this.#prisma = new PrismaClient();
	}
	createOnMongo(data: ICreateLog): Promise<LogEntity> {
		throw new Error("Method not implemented.");
	}
	public createOnPg({ profile, profileId, method, path, data }: ICreateLog): Promise<LogEntity> {
		return this.#prisma.log.create({
			data: {
				[profile.toLowerCase()]: { connect: { id: profileId } },
				method,
				route: path,
				data,
			},
		});
	}
	// public createOnMongo({ profile, profileId, method, path, data }: ICreateLog): Promise<LogEntity> {
	// 	return this.#mongoose.cre
	// }
}
