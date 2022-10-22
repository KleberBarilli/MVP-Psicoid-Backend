import { Notification, View } from "@prisma/client";

export interface INotificationsRepository {
	findById(id: string): Promise<Notification | null>;
	findAll(
		profile: string,
		profileId: string,
		pagination: any,
	): Promise<(number | Notification[])[]>;
	updateView(id: string, isRead: boolean): Promise<View>;
	removeView(id: string): Promise<View>;
}
