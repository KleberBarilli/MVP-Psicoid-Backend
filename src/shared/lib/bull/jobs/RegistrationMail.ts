import { sendEmail } from "@shared/lib/ses";
import { Job } from "bull";

export default {
	key: "RegistrationMail",
	options: {},
	async handle(job: Job) {
		return await sendEmail(job.data);
	},
};
