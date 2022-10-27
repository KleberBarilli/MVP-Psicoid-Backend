import { Job } from 'bull'
import CreateNotification from '@modules/notification/services/CreateNotificationService'

export default {
	key: 'CreateNotification',
	options: {},
	async handle(job: Job) {
		return await CreateNotification.execute(job.data)
	},
}
