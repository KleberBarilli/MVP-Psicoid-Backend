import { ICredential } from '@shared/interfaces/ICredential'
import { inject, injectable } from 'tsyringe'
import { ICredentialsRepository } from '../domain/repositories/ICredentialsRepository'

@injectable()
export default class WhoiamService {
	constructor(
		@inject('CredentialsRepository')
		public credentialsRepository: ICredentialsRepository,
	) {}

	public async execute(id: string, role: string): Promise<ICredential | null> {
		let user: any
		switch (role) {
			case 'CUSTOMER':
				user = await this.credentialsRepository.iAmCustomer(id)

				user.customer.psychologists.map((el: { id: string; selected: boolean }) => {
					if (el.id === user.customer.selectedPsychologistId) {
						el.selected = true
					}
					return el
				})

				return user
			case 'PSYCHOLOGIST':
				return await this.credentialsRepository.iAmPsico(id)
			case 'ADMIN':
				return await this.credentialsRepository.iAmAdmin(id)
			default:
				return null
		}
	}
}
