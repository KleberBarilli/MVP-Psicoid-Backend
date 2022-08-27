import { ICredential } from "@shared/interfaces/ICredential";
import { inject, injectable } from "tsyringe";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";

@injectable()
export default class WhoiamService {
	constructor(
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
	) {}

	public async execute(
		id: string,
		role: string,
	): Promise<ICredential | null> {
		switch (role) {
			case "PACIENT":
				return await this.credentialsRepository.iAmPacient(id);
			case "PSYCHOLOGIST":
				return await this.credentialsRepository.iAmPsico(id);
			default:
				return null;
		}
	}
}
