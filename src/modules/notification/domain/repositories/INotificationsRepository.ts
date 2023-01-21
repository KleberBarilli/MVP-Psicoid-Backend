import { Notification, View } from "@prisma/client";

interface IViewRequest {
	notificationId bigint;
	profile: string;
	profileId: bigint;
}
export interface INotificationsRepository {
	findById(id: bigint): Promise<Notification | null>;
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
	updateView(id: bigint, isRead: boolean): Promise<View>;
	readAll(profile: string, profileId: string): Promise<any>;
	removeView(id: bigint): Promise<View>;
	removeAll(profile: string, profileId: string): Promise<any>;
}
