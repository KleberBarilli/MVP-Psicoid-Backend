import { Notification, View } from "@prisma/client";

interface IViewRequest {
	notificationId: string;
	profile: string;
	profileId: string;
}
export interface INotificationsRepository {
	findById(id: string): Promise<Notification | null>;
	findAll(
		profile: string,
		profileId: string,
		pagination: any,
	): Promise<(number | Notification[])[]>;
	findView({
		notificationId,
		profile,
		profileId,
	}: IViewRequest): Promise<View | null>;
	updateView(id: string, isRead: boolean): Promise<View>;
	readAll(profile: string, profileId: string): Promise<any>;
	removeView(id: string): Promise<View>;
	removeAll(profile: string, profileId: string): Promise<any>;
}
