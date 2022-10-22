import { INotificationsRepository } from "@modules/notification/domain/repositories/INotificationsRepository";
import { Notification, View } from "@prisma/client";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import prisma from "@shared/prisma";
export default class NotificationsRepository implements INotificationsRepository {
	#prisma;
	constructor() {
		this.#prisma = prisma;
	}
	public findById(id: string): Promise<Notification | null> {
		return this.#prisma.notification.findUnique({ where: { id } });
	}
	public findAll(
		profile: string,
		profileId: string,
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
			this.#prisma.notification.count({ where }),
			this.#prisma.notification.findMany({ where, skip, take, orderBy: { [sort]: order } }),
		]);
	}
	public findViewById({ notificationId, profile, profileId }: any): Promise<View | null> {
		return this.#prisma.view.findFirst({
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
	public updateView(id: string, isRead: boolean): Promise<View> {
		return this.#prisma.view.update({ where: { id }, data: { isRead } });
	}
	public removeView(id: string): Promise<View> {
		return this.#prisma.view.delete({ where: { id } });
	}
}
