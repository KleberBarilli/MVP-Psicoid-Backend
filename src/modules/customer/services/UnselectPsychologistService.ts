import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

@injectable()
export class UnselectPsychologistService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute(customerId: bigint): Promise<void> {
		await this.customersRepository.unselectPsychologist(customerId);
		await this.redisCache.invalidate(`${RedisKeys.ME}:${customerId}`);
		await this.redisCache.invalidateKeysByPattern(
			RedisKeys.PSICO_LIST_CUSTOMERS,
		);
	}
}
