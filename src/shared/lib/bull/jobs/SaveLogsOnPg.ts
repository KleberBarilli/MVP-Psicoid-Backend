import LogsRepository from "@modules/log/infra/orm/repositories/LogsRepository";
import { Job } from "bull";

export default {
	key: "SaveLogsOnPg",
	options: {},
	async handle(job: Job) {
		const logsRepo = new LogsRepository();
		return await logsRepo.createOnPg(job.data);
	},
};
