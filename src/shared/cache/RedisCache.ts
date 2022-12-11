import Redis, { Redis as RedisClient } from "ioredis";
import config from "@config/redis";

export class RedisCache {
	private client: RedisClient;

	constructor() {
		this.client = new Redis(config.redis);
	}

	public async save(key: string, value: any): Promise<void> {
		await this.client.set(key, JSON.stringify(value));
	}
	public async recover<T>(key: string): Promise<T | null> {
		const data = await this.client.get(key);

		if (data) {
			return JSON.parse(data) as T;
		}
		return null;
	}

	public async invalidate(key: string): Promise<void> {
		await this.client.del(key);
	}

	public async deleteKeysByPattern(keyPattern: string) {
		const stream = this.client.scanStream();
		stream.on("data", resultKeys => {
			resultKeys.map(async (key: string) => {
				if (key.includes(keyPattern)) {
					await this.client.del(key);
				}
			});
		});
		stream.on("end", () => {
			console.log("all keys have been visited and deleted");
		});
	}
}
