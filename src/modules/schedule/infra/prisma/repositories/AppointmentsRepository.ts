import { prisma as prismaService } from "@shared/prisma";
import { IAppointmentsRepository } from "@modules/schedule/domain/repositories/IAppointmentsRepository";
import { ICreateAppointment } from "@modules/schedule/domain/models/ICreateAppointment";
import {
	IAppointment,
	ICancel,
	IFindManyByCustomer,
	IFindManyByPsico,
} from "@modules/schedule/domain/models/IAppointment";
import { IUpdateAppointment } from "@modules/schedule/domain/models/IUpdateAppointment";

export class AppointmentsRepository implements IAppointmentsRepository {
	constructor(private prisma: typeof prismaService) {}

	public create({
		psychologistId,
		customerId,
		createdBy,
		price,
		startsAt,
		endsAt,
	}: ICreateAppointment): Promise<IAppointment> {
		return this.prisma.appointment.create({
			data: {
				createdBy,
				price,
				startsAt,
				endsAt,
				psychologist: { connect: { id: psychologistId } },
				customer: { connect: { id: customerId } },
			},
		});
	}

	public update(
		id: string,
		{
			psychologistId,
			customerId,
			price,
			status,
			endsAt,
			startsAt,
		}: IUpdateAppointment,
	): Promise<IAppointment> {
		return this.prisma.appointment.update({
			where: { id },
			data: {
				price,
				status,
				endsAt,
				startsAt,
				psychologist: { connect: { id: psychologistId } },
				customer: { connect: { id: customerId } },
			},
		});
	}
	findOne(id: string): Promise<IAppointment | null> {
		return this.prisma.appointment.findUnique({ where: { id } });
	}
	async findManyByPsico({
		psychologistId,
		pagination,
	}: IFindManyByPsico): Promise<IAppointment[]> {
		const { filter, sort, skip, order, take } = pagination;
		return this.prisma.appointment.findMany({
			where: { psychologistId, ...filter },
			orderBy: { [sort]: order },
			skip,
			take,
		});
	}
	async findManyByCustomer({
		customerId,
		pagination,
	}: IFindManyByCustomer): Promise<IAppointment[]> {
		const { filter, sort, skip, order, take } = pagination;
		return this.prisma.appointment.findMany({
			where: { customerId, ...filter },
			orderBy: { [sort]: order },
			skip,
			take,
		});
	}
	async cancel({ appointmentId, closedBy, reason }: ICancel): Promise<void> {
		await this.prisma.closedAppointment.create({
			data: {
				appointmentId,
				closedBy: closedBy ? closedBy : "TIME_EXPIRED",
				cancellationReason: reason,
				cancelAt: new Date(),
			},
		});
	}
}
