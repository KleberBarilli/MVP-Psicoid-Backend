import Bull from "bull";
import redisConfig from "@config/redis";
import { emailProcess } from "../jobs/send-mail";

export const emailQueue = new Bull("email", {
	redis: redisConfig,
});
emailQueue.process(emailProcess);
