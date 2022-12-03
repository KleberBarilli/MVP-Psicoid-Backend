import { injectable, inject } from "tsyringe";
import { ICustomerCreated } from "../domain/models/ICustomerCreated";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import Queue from "@shared/lib/bull/Queue";
import { TypeNotification } from "@prisma/client";
import { HTTP_STATUS_CODE, NOTIFICATION_MESSAGE } from "@shared/utils/enums";
import { ISelectPsychologist } from "../domain/models/ISelectPsychologist";
import AppError from "@shared/errors/AppError";

@injectable()
export default class SelectPsychologistService {
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
				message: NOTIFICATION_MESSAGE.CUSTOMER_SELECT_PSICO,
			},
			views: { psychologistId },
		});
	}
	public async execute({
		customerId,
		psychologistId,
	}: ISelectPsychologist): Promise<ICustomerCreated> {
		const customer = await this.customersRepository.findById(customerId);

		const isPsicoFav = customer?.psychologists.some(
			psico => psico.id === psychologistId,
		);

		if (!isPsicoFav) {
			throw new AppError(
				"Não pode selecionar um psicologo que voce não favoritou",
				HTTP_STATUS_CODE.CONFLICT,
			);
		}

		const selectCustomer =
			await this.customersRepository.selectPsychologist(
				customerId,
				psychologistId,
			);
		await this.notify(customerId, psychologistId);

		return selectCustomer;
	}
}
