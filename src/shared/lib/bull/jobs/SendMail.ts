import { sendEmail } from "@shared/lib/aws/ses";
import { Job } from "bull";

export default {
	key: "SendMail",
	options: {},
	async handle(job: Job) {
		return await sendEmail(job.data);
	},
};
