import { View } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { INotificationsRepository } from "../domain/repositories/INotificationsRepository";

interface IRequest {
	notificationId: string;
	isRead: boolean;
	profile: string;
	profileId: string;
}
@injectable()
export default class UpdateNotificationService {
	constructor(
		@inject("NotificationsRepository")
		private notificationsRepository: INotificationsRepository,
	) {}

	public async execute({
		notificationId,
		profile,
		profileId,
		isRead,
	}: IRequest): Promise<View> {
		const view = await this.notificationsRepository.findView({
			notificationId,
			profile,
			profileId,
		});
		if (!view) {
			throw new AppError("Notification not found");
		}
		return await this.notificationsRepository.updateView(view.id, isRead);
	}
}
