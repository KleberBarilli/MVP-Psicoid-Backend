import { injectable, inject } from "tsyringe";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomerCreated } from "../domain/models/ICustomerCreated";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IHashProvider } from "@modules/auth/providers/HashProvider/models/IHashProvider";
import { AppError } from "@shared/errors/AppError";
import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import {
	ICredential,
	ICredentialResponse,
} from "@shared/interfaces/ICredential";
import { IContact } from "@shared/interfaces/IContact";
import { IProfile } from "@shared/interfaces/IProfile";
import { numOnly } from "@shared/utils/etc";

interface INormalizeResponse {
	normalized: {
		credential: ICredential;
		contact: IContact;
		profile: IProfile;
	};
}

@injectable()
export class CreateCustomerService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
		@inject("HashProvider")
		private hashProvider: IHashProvider,
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
	) {}
	private userExists(email: string): Promise<ICredentialResponse | null> {
		return this.credentialsRepository.findByEmail(email);
	}

	private normalizeCustomer({
		credential,
		profile,
		contact,
	}: ICreateCustomer): INormalizeResponse {
		return {
			normalized: {
				credential: {
					...credential,
					email: credential.email.toLowerCase(),
				},
				profile: {
					...profile,
					cpf: numOnly(profile.cpf),
				},
				contact: {
					email: contact.email?.toLowerCase(),
					telephone: contact.telephone
						? numOnly(contact.telephone)
						: undefined,
					cellPhone: contact.cellPhone
						? numOnly(contact.cellPhone)
						: undefined,
				},
			},
		};
	}
	public async execute({
		credential,
		profile,
		contact,
	}: ICreateCustomer): Promise<ICustomerCreated> {
		const user = await this.userExists(credential.email);
		if (user) {
			throw new AppError({ message: "User already exists" });
		}
		credential.password = await this.hashProvider.generateHash(
			credential.password || "",
		);

		const { normalized } = this.normalizeCustomer({
			credential,
			contact,
			profile,
		});

		return this.customersRepository.create({
			credential: { ...credential, email: normalized.credential.email },
			profile: normalized.profile,
			contact: normalized.contact,
		});
	}
}
