import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";
import { CustomerEntity } from "../infra/prisma/entities/Customer";

@injectable()
export default class UpdateCustomerService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
	) {}
	public async execute(
		id: string,
		{ profile, contact, selectedPsychologistId }: IUpdateCustomer,
	): Promise<CustomerEntity> {
		return await this.customersRepository.update(id, {
			selectedPsychologistId,
			profile,
			contact,
		});
	}
}
