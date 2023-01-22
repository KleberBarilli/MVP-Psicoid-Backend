import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";
import { CustomerEntity } from "../../infra/prisma/entities/Customer";
import { IUpdateCustomer } from "../models/IUpdateCustomer";
import { ICreateGuest } from "../models/ICreateGuest";
import { IGetCustomersByPsico } from "../models/ICustomerCreated";
export interface ICustomersRepository {
	create(data: ICreateCustomer): Promise<CustomerEntity>;
	createGuest(psicoId: bigint, data: ICreateGuest): Promise<CustomerEntity>;
	findById(id: bigint): Promise<CustomerEntity | null>;
	update(data: IUpdateCustomer): Promise<CustomerEntity>;
	addPsychologist(
		customerId: bigint,
		psicoId: bigint,
		selectedPsychologistId: bigint,
	): Promise<ICustomer>;
	removePsychologist(customerId: bigint, psicoId: bigint): Promise<ICustomer>;
	selectPsychologist(customerId: bigint, psicoId: bigint): Promise<ICustomer>;
	unselectPsychologist(customerId: bigint): Promise<ICustomer>;
	findAllByPsico({
		psicoId,
		pagination,
	}: IGetCustomersByPsico): Promise<number & any>;
}
