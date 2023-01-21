import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";
import { Customer } from "@prisma/client";
import { IGetCustomersByPsico } from "../domain/models/ICustomerCreated";
import { ICustomer } from "../domain/models/ICustomer";

interface ISaveRedisCache {
	psicoId: string;
	count: number;
	customers: ICustomer[];
}

interface ICustomerResponse {
	customers: ICustomer[];
	count: number;
}

@injectable()
export class ListCustomersByPsicoService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private async saveRedisCache({
		psicoId,
		count,
		customers,
	}: ISaveRedisCache) {
		return this.redisCache.save(
			`${RedisKeys.PSICO_LIST_CUSTOMERS}:${psicoId}`,
			[count, customers],
		);
	}

	private async findCustomers({ psicoId, pagination }: IGetCustomersByPsico) {
		const [count, customers] =
			await this.customersRepository.findAllByPsico({
				psicoId,
				pagination,
			});

		await this.saveRedisCache({ psicoId, count, customers });

		return { count, customers };
	}

	public async execute({
		psicoId,
		pagination,
	}: IGetCustomersByPsico): Promise<ICustomerResponse> {
		const cachedCustomers = await this.redisCache.recover<any>(
			`${RedisKeys.PSICO_LIST_CUSTOMERS}:${JSON.stringify(
				pagination.search,
			)}:${psicoId}`,
		);

		if (cachedCustomers) {
			const count = cachedCustomers[0];
			const customers = cachedCustomers[1];

			return { count, customers };
		}

		return this.findCustomers({ psicoId, pagination });
	}
}
