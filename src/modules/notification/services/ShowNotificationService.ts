import { Notification } from '@prisma/client'
import { injectable, inject } from 'tsyringe'
import { INotificationsRepository } from '../domain/repositories/INotificationsRepository'

@injectable()
export default class ShowNotificationService {
	constructor(
		@inject('NotificationsRepository')
		public notificationsRepository: INotificationsRepository,
	) {}
	public async execute(id: string): Promise<Notification | null> {
		return await this.notificationsRepository.findById(id)
	}
}
