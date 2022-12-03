import { injectable, inject } from "tsyringe";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomerCreated } from "../domain/models/ICustomerCreated";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IHashProvider } from "@modules/auth/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import { ICredentialResponse } from "@shared/interfaces/ICredential";

@injectable()
export default class CreateCustomerService {
	constructor(
		@inject("CustomersRepository")
		public customersRepository: ICustomersRepository,
		@inject("HashProvider")
		public hashProvider: IHashProvider,
		@inject("CredentialsRepository")
		public credentialsRepository: ICredentialsRepository,
	) {}
	private userExists(email: string): Promise<ICredentialResponse | null> {
		return this.credentialsRepository.findByEmail(email);
	}
	public async execute({
		credential,
		profile,
		contact,
	}: ICreateCustomer): Promise<ICustomerCreated> {
		const user = await this.userExists(credential.email);
		if (user) {
			throw new AppError("User already exists");
		}
		credential.password = await this.hashProvider.generateHash(
			credential.password || "",
		);

		return await this.customersRepository.create({
			credential,
			profile,
			contact,
		});
	}
}
