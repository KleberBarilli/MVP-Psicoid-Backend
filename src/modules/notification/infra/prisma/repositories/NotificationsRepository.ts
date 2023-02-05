import { prisma } from "@shared/prisma";
import { INotificationsRepository } from "@modules/notification/domain/repositories/INotificationsRepository";
import { Notification, View } from "@prisma/client";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
export class NotificationsRepository implements INotificationsRepository {
	public findById(integrationId: string): Promise<Notification | null> {
		return prisma.notification.findUnique({
			where: { integrationId },
			include: { views: true },
		});
	}
	public findAll(
		profile: string,
		profileId: number,
		{ skip, take, sort, order, filter }: IPagination,
	): Promise<(number | Notification[])[]> {
		const where = {
			...filter,
			views: {
				some:
					profile === "CUSTOMER"
						? { customerId: profileId }
						: { psychologistId: profileId },
			},
		};
		return Promise.all([
			prisma.notification.count({ where }),
			prisma.notification.findMany({
				where,
				skip,
				take,
				orderBy: { [sort]: order },
				include: { views: true },
			}),
		]);
	}
	public findView({
		notificationId,
		profile,
		profileId,
	}: any): Promise<View | null> {
		return prisma.view.findFirst({
			where: {
				AND: [
					{ notificationId },
					profile === "CUSTOMER"
						? { customerId: profileId }
						: { psychologistId: profileId },
				],
			},
		});
	}
	public updateView(id: number, readAt: Date): Promise<View> {
		return prisma.view.update({
			where: { id },
			data: { readAt },
		});
	}
	public async readAll(profile: string, profileId: number): Promise<void> {
		await prisma.view.updateMany({
			where:
				profile === "CUSTOMER"
					? { customerId: profileId }
					: { psychologistId: profileId },
			data: { readAt: new Date() },
		});
	}
	public removeView(filter: any): Promise<View> {
		return prisma.view.delete({ where: { ...filter } });
	}
	public async removeAll(profile: string, profileId: number): Promise<void> {
		await prisma.view.deleteMany({
			where:
				profile === "CUSTOMER"
					? { customerId: profileId }
					: { psychologistId: profileId },
		});
	}
}
