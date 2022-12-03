import { injectable, inject } from "tsyringe";
import { ICustomerCreated } from "../domain/models/ICustomerCreated";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IAddPsychologist } from "../domain/models/IAddPsychologist";

@injectable()
export default class AddPsychologistService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
	) {}
	public async execute({
		customerId,
		psychologistId,
		selected,
	}: IAddPsychologist): Promise<ICustomerCreated> {
		let selectedPsychologistId = psychologistId;
		if (!selected) {
			const customer = await this.customersRepository.findById(
				customerId,
			);
			selectedPsychologistId = customer?.selectedPsychologistId || "";
		}
		return this.customersRepository.addPsychologist(
			customerId,
			psychologistId,
			selectedPsychologistId,
		);
	}
}
