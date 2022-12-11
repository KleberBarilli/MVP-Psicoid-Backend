import { Job } from "bull";
import { CreateNotificationService } from "@modules/notification/services/CreateNotificationService";

export default {
	key: "CreateNotification",
	options: {},
	async handle(job: Job) {
		return await CreateNotificationService.execute(job.data);
	},
};
