import { RedisOptions } from "ioredis";

interface ICacheConfig {
	redis: RedisOptions;
}
export default {
	redis: {
		port: Number(process.env.REDIS_PORT || "6379"),
		host: process.env.REDIS_HOST || "localhost",
		password: process.env.REDIS_PASSWORD,
	},
} as ICacheConfig;
