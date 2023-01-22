import { Notification, View } from "@prisma/client";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

interface IViewRequest {
	notificationId: bigint;
	profile: string;
	profileId: bigint;
}
export interface INotificationsRepository {
	findById(integrationId: string): Promise<Notification | null>;
	findAll(
		profile: string,
		profileId: bigint,
		pagination: IPagination,
	): Promise<(number | Notification[])[]>;
	findView({
		notificationId,
		profile,
		profileId,
	}: IViewRequest): Promise<View | null>;
	updateView(id: bigint, isRead: boolean): Promise<View>;
	readAll(profile: string, profileId: bigint): Promise<void>;
	removeView(id: bigint): Promise<View>;
	removeAll(profile: string, profileId: bigint): Promise<void>;
}
