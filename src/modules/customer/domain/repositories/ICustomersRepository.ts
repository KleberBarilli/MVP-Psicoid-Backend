import { ICreateCustomer } from '../models/ICreateCustomer'
import { ICustomer } from '../models/ICustomer'
import { CustomerEntity } from '../../infra/prisma/entities/Customer'
import { ICredential } from '@shared/interfaces/ICredential'
import { IUpdateCustomer } from '../models/IUpdateCustomer'
import { IPagination } from '@shared/infra/http/middlewares/pagination'
import { ICreateGuest } from '../models/ICreateGuest'
export interface ICustomersRepository {
	create(data: ICreateCustomer): Promise<CustomerEntity>
	createGuest(psicoId: string, data: ICreateGuest): Promise<CustomerEntity>
	findById(id: string): Promise<ICustomer | null>
	findByEmail(email: string): Promise<ICredential | null>
	update(id: string, data: IUpdateCustomer): Promise<CustomerEntity>
	addPsychologist(
		customerId: string,
		psicoId: string,
		selectedPsychologistId: string,
	): Promise<ICustomer>
	findAllByPsico(
		psicoId: string,
		{ skip, take, sort, order, filter }: IPagination,
	): Promise<number & any>
}
