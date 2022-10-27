import { inject, injectable } from 'tsyringe'
import { ICredentialsRepository } from '../domain/repositories/ICredentialsRepository'

@injectable()
export default class DeactivateAccountService {
	constructor(
		@inject('CredentialsRepository')
		public credentialsRepository: ICredentialsRepository,
	) {}

	public async execute(id: string): Promise<void> {
		await this.credentialsRepository.deactivateAccount(id)
	}
}
