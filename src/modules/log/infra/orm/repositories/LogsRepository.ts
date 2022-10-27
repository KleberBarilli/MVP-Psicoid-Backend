import { ICreateLog } from '@modules/log/domain/models/ICreateLog'
import { ILogsRepository } from '@modules/log/domain/repositories/ILogsRepository'
import { PrismaClient } from '@prisma/client'
import { LogEntity } from '../entities/Log'
import LogModel from '../entities/LogMongo'

export default class LogsRepository implements ILogsRepository {
	#prisma
	#logMongo

	constructor() {
		this.#prisma = new PrismaClient()
		this.#logMongo = LogModel
	}

	public createOnPg({ profile, profileId, method, path, data }: ICreateLog): Promise<LogEntity> {
		return this.#prisma.log.create({
			data: {
				[profile.toLowerCase()]: { connect: { id: profileId } },
				method,
				route: path,
				data,
			},
		})
	}
	public createOnMongo({ profile, profileId, method, path, data }: ICreateLog): Promise<any> {
		profile = profile.toLowerCase() + 'Id'
		return this.#logMongo.create({
			[profile]: profileId,
			method,
			route: path,
			data,
		})
	}
}
