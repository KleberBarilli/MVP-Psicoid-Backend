import { Job } from "bull";
import { sendEmail } from "@shared/lib/ses";

export const emailProcess = async (job: Job) => {
	console.log("job", job);
	const sent = await sendEmail(job.data);
	console.log("Email enviado", sent);

	return sent;
};
