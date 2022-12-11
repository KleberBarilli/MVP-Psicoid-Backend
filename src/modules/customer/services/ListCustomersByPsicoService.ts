import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustomer } from "../domain/models/ICustomer";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

@injectable()
export class ListCustomersByPsicoService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
	) {}
	public async execute(
		psicoid: string,
		pagination: IPagination,
	): Promise<ICustomer[]> {
		const [count, customers] =
			await this.customersRepository.findAllByPsico(psicoid, pagination);
		return [count, customers];
	}
}
