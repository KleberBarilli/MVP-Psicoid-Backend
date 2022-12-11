import Redis, { Redis as RedisClient } from "ioredis";
import config from "@config/redis";

export class RedisCache {
	private client: RedisClient;

	constructor() {
		this.client = new Redis(config.redis);
	}

	public async save(key: string, value: any): Promise<void> {
		console.log(key, value);
	}
	// 	public async recover<T>(key: string): Promise<T | null> {
	// 		console.log(key);
	// 	}

	//public async invalidate(key: string): Promise<void> {

	//}
}
