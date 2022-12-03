import prisma from "@shared/prisma";
import { ICreateCustomer } from "../../../domain/models/ICreateCustomer";
import { ICustomersRepository } from "../../../domain/repositories/ICustomersRepository";
import { CustomerEntity } from "../entities/Customer";
import { IUpdateCustomer } from "@modules/customer/domain/models/IUpdateCustomer";
import { ICustomer } from "@modules/customer/domain/models/ICustomer";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { ICreateGuest } from "@modules/customer/domain/models/ICreateGuest";

export default class CustomersRepository implements ICustomersRepository {
	public create({
		credential,
		profile,
		contact,
	}: ICreateCustomer): Promise<CustomerEntity> {
		return prisma.customer.create({
			data: {
				credential: { create: { ...credential, role: "CUSTOMER" } },
				profile: {
					create: {
						...profile,
						contact: { create: { ...contact } },
					},
				},
			},
		});
	}
	public createGuest(
		psicoId: string,
		{ name, contact }: ICreateGuest,
	): Promise<CustomerEntity> {
		return prisma.customer.create({
			data: {
				guest: { create: { name, contact: { create: contact } } },
				psychologists: { connect: { id: psicoId } },
			},
		});
	}

	public findById(id: string): Promise<CustomerEntity | null> {
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
	public update(
		id: string,
		{ profile, contact, selectedPsychologistId }: IUpdateCustomer,
	): Promise<CustomerEntity> {
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
		});
	}
	public addPsychologist(
		customerId: string,
		psicoId: string,
		selectedPsychologistId: string,
	): Promise<ICustomer> {
		return prisma.customer.update({
			where: { id: customerId },
			data: {
				psychologists: { connect: { id: psicoId } },
				selectedPsychologistId,
			},
		});
	}

	public findAllByPsico(
		psicoId: string,
		{ skip, take, sort, order, filter }: IPagination,
	): Promise<number & any> {
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
}
