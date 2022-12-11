import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IAddPsychologist } from "../domain/models/IAddPsychologist";
import Queue from "@shared/lib/bull/Queue";
import { TypeNotification } from "@prisma/client";
import { NOTIFICATION_MESSAGE } from "@shared/utils/enums";
import { ICustomer } from "../domain/models/ICustomer";

@injectable()
export class AddPsychologistService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
	) {}
	private notify(customerId: string, psychologistId: string) {
		return Queue.add("CreateNotification", {
			type: TypeNotification.CUSTOMER_ADD_PSICO,
			data: {
				customerId,
				psychologistId,
				message: NOTIFICATION_MESSAGE.CUSTOMER_ADD_PSICO,
			},
			views: { psychologistId },
		});
	}
	public async execute({
		customerId,
		psychologistId,
		selected,
	}: IAddPsychologist): Promise<ICustomer> {
		let selectedPsychologistId = psychologistId;
		if (!selected) {
			const customer = await this.customersRepository.findById(
				customerId,
			);
			selectedPsychologistId = customer?.selectedPsychologistId || "";
		}
		const customer = await this.customersRepository.addPsychologist(
			customerId,
			psychologistId,
			selectedPsychologistId,
		);
		await this.notify(customerId, psychologistId);

		return customer;
	}
}
