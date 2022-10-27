import { injectable, inject } from 'tsyringe'
import { ICreateGuest } from '../domain/models/ICreateGuest'
import { ICustomerCreated } from '../domain/models/ICustomerCreated'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

@injectable()
export default class CreateCustomerService {
	constructor(
		@inject('CustomersRepository')
		public customersRepository: ICustomersRepository,
	) {}
	public async execute(
		psicoId: string,
		{ name, contact }: ICreateGuest,
	): Promise<ICustomerCreated> {
		return await this.customersRepository.createGuest(psicoId, {
			name,
			contact,
		})
	}
}
