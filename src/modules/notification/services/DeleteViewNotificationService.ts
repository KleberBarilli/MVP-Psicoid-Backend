import { View } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { INotificationsRepository } from "../domain/repositories/INotificationsRepository";

interface IRequest {
	notificationId: string;
	profile: string;
	profileId: string;
}
@injectable()
export default class DeleteNotificationService {
	constructor(
		@inject("NotificationsRepository")
		private notificationsRepository: INotificationsRepository,
	) {}
	public async execute({
		notificationId,
		profile,
		profileId,
	}: IRequest): Promise<View | null> {
		const view = await this.notificationsRepository.findView({
			notificationId,
			profile,
			profileId,
		});
		if (!view) {
			throw new AppError("Notification not found");
		}
		return await this.notificationsRepository.removeView(view.id);
	}
}
