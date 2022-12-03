import { Notification } from "@prisma/client";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { injectable, inject } from "tsyringe";
import { INotificationsRepository } from "../domain/repositories/INotificationsRepository";

@injectable()
export default class ListNotificationService {
	constructor(
		@inject("NotificationsRepository")
		private notificationsRepository: INotificationsRepository,
	) {}
	public async execute(
		profile: string,
		profileId: string,
		pagination: IPagination,
	): Promise<(number | Notification[])[]> {
		return await this.notificationsRepository.findAll(
			profile,
			profileId,
			pagination,
		);
	}
}
