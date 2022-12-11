import { Notification } from "@prisma/client";
import { injectable, inject } from "tsyringe";
import { INotificationsRepository } from "../domain/repositories/INotificationsRepository";

@injectable()
export class ShowNotificationService {
	constructor(
		@inject("NotificationsRepository")
		private notificationsRepository: INotificationsRepository,
	) {}
	public async execute(id: string): Promise<Notification | null> {
		return await this.notificationsRepository.findById(id);
	}
}
