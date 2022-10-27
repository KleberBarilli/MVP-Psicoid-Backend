import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IUpdateCredential } from '../domain/models/IUpdateCredentials'
import { ICredentialsRepository } from '../domain/repositories/ICredentialsRepository'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'

@injectable()
export default class UpdateCredentialsService {
	constructor(
		@inject('CredentialsRepository')
		public credentialsRepository: ICredentialsRepository,
		@inject('HashProvider')
		public hashProvider: IHashProvider,
	) {}

	public async execute(id: string, { email, password }: IUpdateCredential): Promise<void> {
		const user = await this.credentialsRepository.findById(id)

		if (!user) {
			throw new AppError('Usuário não encontrado')
		}
		const hashedPassword = await this.hashProvider.generateHash(password || '')
		await this.credentialsRepository.updateCredential(id, { email, password: hashedPassword })
	}
}
