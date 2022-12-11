import { Notification } from "@prisma/client";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { INotificationsRepository } from "../domain/repositories/INotificationsRepository";

interface IRequest {
	profile: string;
	profileId: string;
	pagination: IPagination;
}
@injectable()
export class ListNotificationService {
	constructor(
		@inject("NotificationsRepository")
		private notificationsRepository: INotificationsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private async findNotifications({
		profile,
		profileId,
		pagination,
	}: IRequest) {
		const notifications = await this.notificationsRepository.findAll(
			profile,
			profileId,
			pagination,
		);
		await this.redisCache.save(
			`${RedisKeys.LIST_NOTIFICATIONS}:${profileId}`,
			notifications,
		);

		return notifications;
	}

	public async execute({
		profile,
		profileId,
		pagination,
	}: IRequest): Promise<(number | Notification[])[]> {
		const notificationsInCache = await this.redisCache.recover<
			(number | Notification[])[]
		>(`${RedisKeys.LIST_NOTIFICATIONS}:${profileId}`);

		if (notificationsInCache) {
			return notificationsInCache;
		}

		return this.findNotifications({ profile, profileId, pagination });
	}
}
