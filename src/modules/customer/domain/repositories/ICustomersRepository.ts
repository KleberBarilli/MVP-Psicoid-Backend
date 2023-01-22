import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";
import { CustomerEntity } from "../../infra/prisma/entities/Customer";
import { IUpdateCustomer } from "../models/IUpdateCustomer";
import { ICreateGuest } from "../models/ICreateGuest";
import { IGetCustomersByPsico } from "../models/ICustomerCreated";
export interface ICustomersRepository {
	create(data: ICreateCustomer): Promise<CustomerEntity>;
	createGuest(psicoId: number, data: ICreateGuest): Promise<CustomerEntity>;
	findById(id: number): Promise<CustomerEntity | null>;
	update(data: IUpdateCustomer): Promise<CustomerEntity>;
	addPsychologist(
		customerId: number,
		psicoId: number,
		selectedPsychologistId: number,
	): Promise<ICustomer>;
	removePsychologist(customerId: number, psicoId: number): Promise<ICustomer>;
	selectPsychologist(customerId: number, psicoId: number): Promise<ICustomer>;
	unselectPsychologist(customerId: number): Promise<ICustomer>;
	findAllByPsico({
		psicoId,
		pagination,
	}: IGetCustomersByPsico): Promise<number & any>;
}
