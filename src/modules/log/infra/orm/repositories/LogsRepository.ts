import { ICreateLog } from '@modules/log/domain/models/ICreateLog'
import { ILogsRepository } from '@modules/log/domain/repositories/ILogsRepository'
import prisma from '@shared/prisma'
import { LogEntity } from '../entities/Log'
import logModel from '../entities/LogMongo'

export default class LogsRepository implements ILogsRepository {
	public createOnPg({ profile, profileId, method, path, data }: ICreateLog): Promise<LogEntity> {
		return prisma.log.create({
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
		return logModel.create({
			[profile]: profileId,
			method,
			route: path,
			data,
		})
	}
}
