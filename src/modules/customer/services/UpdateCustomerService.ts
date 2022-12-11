import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";
import { RedisKeys } from "@shared/utils/enums";
import { IRedisCache } from "@shared/cache/IRedisCache";

@injectable()
export default class UpdateCustomerService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute({
		id,
		profile,
		contact,
		selectedPsychologistId,
	}: IUpdateCustomer): Promise<void> {
		await this.customersRepository.update({
			id,
			selectedPsychologistId,
			profile,
			contact,
		});
		await this.redisCache.invalidate(`${RedisKeys.ME}:${id}`);
		await this.redisCache.invalidateKeysByPattern(
			RedisKeys.PSICO_LIST_CUSTOMERS,
		);
	}
}
