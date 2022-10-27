import LogsRepository from '@modules/log/infra/orm/repositories/LogsRepository'
import { ICreateLog } from '@modules/log/domain/models/ICreateLog'

export default {
	key: 'SaveLogsOnPg',
	options: {},
	async handle(job: ICreateLog) {
		const logsRepo = new LogsRepository()
		return await logsRepo.createOnPg(job.data)
	},
}
