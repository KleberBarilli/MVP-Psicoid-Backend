import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustomer } from "../domain/models/ICustomer";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";

@injectable()
export class ListCustomersByPsicoService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute(
		psicoid: string,
		pagination: IPagination,
	): Promise<ICustomer[]> {
		const cachedCustomers = await this.redisCache.recover<any>(
			`${RedisKeys.PSICO_LIST_CUSTOMERS}:${JSON.stringify(
				pagination.search,
			)}:${psicoid}`,
		);

		let count = cachedCustomers ? cachedCustomers[0] : undefined;
		let customers = cachedCustomers ? cachedCustomers[1] : undefined;

		if (!cachedCustomers) {
			[count, customers] = await this.customersRepository.findAllByPsico(
				psicoid,
				pagination,
			);
			await this.redisCache.save(
				`${RedisKeys.PSICO_LIST_CUSTOMERS}:${JSON.stringify(
					pagination.search,
				)}:${psicoid}`,
				[count, customers],
			);
		}

		return [count, customers];
	}
}
