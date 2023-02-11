import { prisma } from "@shared/prisma";
import { ICreateCustomer } from "../../../domain/models/ICreateCustomer";
import { ICustomersRepository } from "../../../domain/repositories/ICustomersRepository";
import { CustomerEntity } from "../entities/Customer";
import { IUpdateCustomer } from "@modules/customer/domain/models/IUpdateCustomer";
import { ICustomer } from "@modules/customer/domain/models/ICustomer";
import { ICreateGuest } from "@modules/customer/domain/models/ICreateGuest";
import { IGetCustomersByPsico } from "@modules/customer/domain/models/ICustomerCreated";
import { ROLE_TYPE } from "@shared/utils/enums";
import { Customer } from "@prisma/client";

export class CustomersRepository implements ICustomersRepository {
	public create({
		credential,
		profile,
		contact,
	}: ICreateCustomer): Promise<any> {
		return prisma.customer.create({
			data: {
				credential: { create: { ...credential, role: "CUSTOMER" } },
				profile: {
					create: {
						...profile,
						sentMessages: { create: { type: ROLE_TYPE.customer } },
						receivedMessages: {
							create: { type: ROLE_TYPE.customer },
						},
						contact: { create: { ...contact } },
					},
				},
			},
		});
	}
	public createGuest(
		psicoId: number,
		{ name, contact }: ICreateGuest,
	): Promise<Customer> {
		return prisma.customer.create({
			data: {
				guest: { create: { name, contact: { create: contact } } },
				psychologists: { connect: { id: psicoId } },
			},
		});
	}

	public findById(id: number): Promise<CustomerEntity | null> {
		return prisma.customer.findUnique({
			where: { id },
			include: {
				credential: { select: { email: true } },
				profile: { include: { contact: true } },
				psychologists: true,
				guest: true,
			},
		});
	}
	public update({
		id,
		profile,
		contact,
		selectedPsychologistId,
	}: IUpdateCustomer): Promise<CustomerEntity> {
		return prisma.customer.update({
			where: { id },
			data: {
				selectedPsychologistId,
				profile: {
					update: {
						...profile,
						contact: { update: { ...contact } },
					},
				},
			},
			include: {
				credential: { select: { email: true } },
				profile: { include: { contact: true } },
				psychologists: true,
				guest: true,
			},
		});
	}

	public findAllByPsico({
		psicoId,
		pagination,
	}: IGetCustomersByPsico): Promise<number & any> {
		const { filter, sort, order, skip, take } = pagination;

		return Promise.all([
			prisma.customer.count({
				where: { psychologists: { some: { id: psicoId } }, ...filter },
			}),
			prisma.customer.findMany({
				where: { psychologists: { some: { id: psicoId } }, ...filter },
				orderBy: { [sort]: order },
				skip,
				take,
				select: {
					id: true,
					profile: { include: { contact: true } },
					guest: true,
				},
			}),
		]);
	}
	public addPsychologist(
		customerId: number,
		psicoId: number,
		selectedPsychologistId: number,
	): Promise<ICustomer> {
		return prisma.customer.update({
			where: { id: customerId },
			data: {
				psychologists: { connect: { id: psicoId } },
				selectedPsychologistId,
			},
		});
	}
	public removePsychologist(
		customerId: number,
		psicoId: number,
	): Promise<ICustomer> {
		return prisma.customer.update({
			where: { id: customerId },
			data: {
				psychologists: { disconnect: { id: psicoId } },
			},
		});
	}
	public selectPsychologist(
		customerId: number,
		psicoId: number,
	): Promise<ICustomer> {
		return prisma.customer.update({
			where: { id: customerId },
			data: {
				selectedPsychologistId: psicoId,
			},
		});
	}
	public unselectPsychologist(customerId: number): Promise<ICustomer> {
		return prisma.customer.update({
			where: { id: customerId },
			data: {
				selectedPsychologistId: null,
			},
		});
	}
}
