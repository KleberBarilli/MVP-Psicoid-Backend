import { injectable, inject } from "tsyringe";
import { ICreateGuest } from "../domain/models/ICreateGuest";
import { ICustomerCreated } from "../domain/models/ICustomerCreated";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

@injectable()
export class CreateGuestService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
	) {}
	public async execute(
		psicoId: number,
		{ name, contact }: ICreateGuest,
	): Promise<ICustomerCreated> {
		return await this.customersRepository.createGuest(psicoId, {
			name,
			contact,
		});
	}
}
