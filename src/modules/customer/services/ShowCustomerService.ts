import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

import { ICustomer } from "../domain/models/ICustomer";

@injectable()
export class ShowCustomerService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
	) {}
	public async execute(id: bigint): Promise<ICustomer | null> {
		return await this.customersRepository.findById(id);
	}
}
