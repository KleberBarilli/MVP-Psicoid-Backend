import { IRedisCache } from "@shared/cache/IRedisCache";
import { AppError } from "@shared/errors/AppError";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { INotificationsRepository } from "../domain/repositories/INotificationsRepository";

interface IRequest {
	notificationId: number;
	isRead: boolean;
	profile: string;
	profileId: number;
}
@injectable()
export class UpdateNotificationService {
	constructor(
		@inject("NotificationsRepository")
		private notificationsRepository: INotificationsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	public async execute({
		notificationId,
		profile,
		profileId,
		isRead,
	}: IRequest): Promise<void> {
		const view = await this.notificationsRepository.findView({
			notificationId,
			profile,
			profileId,
		});
		if (!view) {
			throw new AppError({ message: "Notification not found" });
		}
		await this.notificationsRepository.updateView(view.id, isRead);

		await this.redisCache.invalidate(
			`${RedisKeys.LIST_NOTIFICATIONS}:${profileId}`,
		);
	}
}
