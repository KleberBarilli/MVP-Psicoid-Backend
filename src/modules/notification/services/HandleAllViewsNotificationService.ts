import { View } from "@prisma/client";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { INotificationsRepository } from "../domain/repositories/INotificationsRepository";

@injectable()
export class HandleAllNotificationsService {
	constructor(
		@inject("NotificationsRepository")
		private notificationsRepository: INotificationsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	public async execute(
		profile: string,
		profileId: number,
		remove: boolean,
	): Promise<View> {
		await this.redisCache.invalidate(
			`${RedisKeys.LIST_NOTIFICATIONS}:${profileId}`,
		);
		if (remove) {
			return this.notificationsRepository.removeAll(profile, profileId);
		}
		return this.notificationsRepository.readAll(profile, profileId);
	}
}
