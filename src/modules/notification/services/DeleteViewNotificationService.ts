import { View } from "@prisma/client";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { AppError } from "@shared/errors/AppError";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { INotificationsRepository } from "../domain/repositories/INotificationsRepository";

interface IRequest {
	notificationId: string;
	profile: string;
	profileId: string;
}
@injectable()
export class DeleteNotificationService {
	constructor(
		@inject("NotificationsRepository")
		private notificationsRepository: INotificationsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute({
		notificationId,
		profile,
		profileId,
	}: IRequest): Promise<void> {
		const view = await this.notificationsRepository.findView({
			notificationId,
			profile,
			profileId,
		});
		if (!view) {
			throw new AppError({ message: "Notification not found" });
		}
		await this.notificationsRepository.removeView(view.id);
		await this.redisCache.invalidate(
			`${RedisKeys.LIST_NOTIFICATIONS}:${profileId}`,
		);
	}
}
