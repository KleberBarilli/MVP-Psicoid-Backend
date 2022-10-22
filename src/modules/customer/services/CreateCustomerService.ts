import { injectable, inject } from "tsyringe";

import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomerCreated } from "../domain/models/ICustomerCreated";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IHashProvider } from "@modules/auth/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";

@injectable()
export default class CreateCustomerService {
	constructor(
		@inject("CustomersRepository")
		public customersRepository: ICustomersRepository,
		@inject("HashProvider")
		public hashProvider: IHashProvider,
	) {}
	public async execute({
		credential,
		profile,
		contact,
	}: ICreateCustomer): Promise<ICustomerCreated> {
		const userExists = await this.customersRepository.findByEmail(credential.email);
		if (userExists) {
			throw new AppError("User already exists");
		}
		credential.password = await this.hashProvider.generateHash(credential.password || "");

		return await this.customersRepository.create({
			credential,
			profile,
			contact,
		});
	}
}
