import { injectable, inject } from "tsyringe";
import { ICustomerCreated } from "../domain/models/ICustomerCreated";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IRemovePsychologist } from "../domain/models/IRemovePsychologist";

@injectable()
export default class RemovePsychologistService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
	) {}
	public async execute({
		customerId,
		psychologistId,
	}: IRemovePsychologist): Promise<ICustomerCreated> {
		return this.customersRepository.removePsychologist(
			customerId,
			psychologistId,
		);
	}
}
