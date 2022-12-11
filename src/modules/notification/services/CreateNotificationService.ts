import { Notification } from "@prisma/client";
import { prisma } from "@shared/prisma";
import { emitEvent } from "@shared/lib/socket.io";
import { RedisCache } from "@shared/cache/RedisCache";
import { RedisKeys } from "@shared/utils/enums";

export class CreateNotificationService {
	public static async execute({
		type,
		data,
		views,
	}: any): Promise<Notification> {
		const redisCache = new RedisCache();
		const notification = await prisma.notification.create({
			data: { type, data, views: { createMany: { data: views } } },
		});
		emitEvent("notify:send", notification);

		views.psychologistId
			? await redisCache.invalidate(
					`${RedisKeys.LIST_NOTIFICATIONS}:${views.psychologistId}`,
			  )
			: undefined;

		views.customerId
			? await redisCache.invalidate(
					`${RedisKeys.LIST_NOTIFICATIONS}:${views.customerId}`,
			  )
			: undefined;

		return notification;
	}
}
