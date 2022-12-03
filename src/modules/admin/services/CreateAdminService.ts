import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import { IHashProvider } from "@modules/auth/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import { ICredentialResponse } from "@shared/interfaces/ICredential";
import { inject, injectable } from "tsyringe";
import { ICreateAdmin } from "../domain/models/ICreateAdmin";
import { IAdminsRepository } from "../domain/repositories/IAdminsRepository";

@injectable()
export default class CreateAdminService {
	constructor(
		@inject("AdminsRepository")
		private adminsRepository: IAdminsRepository,
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
		@inject("HashProvider")
		private hashProvider: IHashProvider,
	) {}
	private userExists(email: string): Promise<ICredentialResponse | null> {
		return this.credentialsRepository.findByEmail(email);
	}
	public async execute({ credential, profile }: ICreateAdmin) {
		const user = await this.userExists(credential.email);
		if (user) {
			throw new AppError("User already exists");
		}
		credential.password = await this.hashProvider.generateHash(
			credential.password,
		);
		return this.adminsRepository.create({ credential, profile });
	}
}
