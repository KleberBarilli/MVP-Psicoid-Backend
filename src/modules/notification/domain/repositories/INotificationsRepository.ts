import { Notification, View } from "@prisma/client";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

interface IViewRequest {
	notificationId: number;
	profile: string;
	profileId: number;
}
export interface INotificationsRepository {
	findById(integrationId: string): Promise<Notification | null>;
	findAll(
		profile: string,
		profileId: number,
		pagination: IPagination,
	): Promise<(number | Notification[])[]>;
	findView({
		notificationId,
		profile,
		profileId,
	}: IViewRequest): Promise<View | null>;
	updateView(id: number, readAt: Date | undefined): Promise<View>;
	readAll(profile: string, profileId: number): Promise<void>;
	removeView(id: number): Promise<View>;
	removeAll(profile: string, profileId: number): Promise<void>;
}
