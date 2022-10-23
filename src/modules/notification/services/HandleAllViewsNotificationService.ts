import { View } from "@prisma/client";
import { injectable, inject } from "tsyringe";
import { INotificationsRepository } from "../domain/repositories/INotificationsRepository";

@injectable()
export default class HandleAllNotificationsService {
	constructor(
		@inject("NotificationsRepository")
		public notificationsRepository: INotificationsRepository,
	) {}

	public async execute(profile: string, profileId: string, remove: boolean): Promise<View> {
		if (remove) {
			return this.notificationsRepository.removeAll(profile, profileId);
		}
		return this.notificationsRepository.readAll(profile, profileId);
	}
}
