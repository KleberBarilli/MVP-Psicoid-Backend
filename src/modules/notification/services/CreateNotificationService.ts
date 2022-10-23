import { Notification } from "@prisma/client";
import prisma from "@shared/prisma";
import { emitEvent } from "@shared/lib/socket.io";

export default class CreateNotificationService {
	public static async execute({ type, data, views }: any): Promise<Notification> {
		const notification = await prisma.notification.create({
			data: { type, data, views: { createMany: { data: views } } },
		});
		emitEvent("notify:send", notification);
		return notification;
	}
}
