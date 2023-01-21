import { inject, injectable } from "tsyringe";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";

@injectable()
export class DeactivateAccountService {
	constructor(
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
	) {}

	public async execute(id: bigint): Promise<void> {
		await this.credentialsRepository.deactivateAccount(id);
	}
}
