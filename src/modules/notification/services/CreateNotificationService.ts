import { Notification } from "@prisma/client";
import prisma from "@shared/prisma";

export default class CreateNotificationService {
	public static async execute({ type, data, views }: any): Promise<Notification> {
		const notification = await prisma.notification.create({ data: { type, data, views } });
		//    emitSocketEvent('notify:send', notificacao)
		return notification;
	}
}
