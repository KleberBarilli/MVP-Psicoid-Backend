import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IRemovePsychologist } from "../domain/models/IRemovePsychologist";
import { RedisKeys } from "@shared/utils/enums";
import { IRedisCache } from "@shared/cache/IRedisCache";

@injectable()
export default class RemovePsychologistService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute({
		customerId,
		psychologistId,
	}: IRemovePsychologist): Promise<void> {
		await this.customersRepository.removePsychologist(
			customerId,
			psychologistId,
		);

		await this.redisCache.invalidate(`${RedisKeys.ME}:${customerId}`);
		await this.redisCache.invalidate(`${RedisKeys.ME}:${psychologistId}`);
		//list my fav psicos
	}
}
