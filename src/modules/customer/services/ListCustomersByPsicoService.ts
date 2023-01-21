import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";
import { Customer } from "@prisma/client";
import { IGetCustomersByPsico } from "../domain/models/ICustomerCreated";

@injectable()
export class ListCustomersByPsicoService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private async findCustomers({ psicoId, pagination }: IGetCustomersByPsico) {
		const [count, customers] =
			await this.customersRepository.findAllByPsico({
				psicoId,
				pagination,
			});

		await this.redisCache.save(
			`${RedisKeys.PSICO_LIST_CUSTOMERS}:${psicoId}`,
			[count, customers],
		);

		return [count, customers];
	}

	public async execute({
		psicoId,
		pagination,
	}: IGetCustomersByPsico): Promise<(number | Customer[])[]> {
		const cachedCustomers = await this.redisCache.recover<
			(number | Customer[])[]
		>(
			`${RedisKeys.PSICO_LIST_CUSTOMERS}:${JSON.stringify(
				pagination.search,
			)}:${psicoId}`,
		);

		if (cachedCustomers) {
			const count = cachedCustomers[0];
			const customers = cachedCustomers[1];

			return [count, customers];
		}

		return this.findCustomers({ psicoId, pagination });
	}
}
