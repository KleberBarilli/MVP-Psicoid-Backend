import { injectable, inject } from "tsyringe";
import { ICustomerCreated } from "../domain/models/ICustomerCreated";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IAddPsychologist } from "../domain/models/IAddPsychologist";
import PsychologistsRepository from "@modules/psico/infra/prisma/repositories/PsychologistsRepository";
import Queue from "@shared/lib/bull/Queue";
import CreateNotificationService from "@modules/notification/services/CreateNotificationService";
import { TypeNotification } from "@prisma/client";

interface IRequest {
	id: string;
}
@injectable()
export default class AddPsychologistService {
	constructor(
		@inject("CustomersRepository")
		public customersRepository: ICustomersRepository,
		@inject("PsychologistsRepository")
		public psychologistsRepository: PsychologistsRepository,
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
