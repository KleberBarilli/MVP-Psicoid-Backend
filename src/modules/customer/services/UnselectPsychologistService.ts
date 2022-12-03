import { injectable, inject } from "tsyringe";
import { ICustomerCreated } from "../domain/models/ICustomerCreated";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

@injectable()
export default class UnselectPsychologistService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
	) {}
	public async execute(customerId: string): Promise<ICustomerCreated> {
		return this.customersRepository.unselectPsychologist(customerId);
	}
}
