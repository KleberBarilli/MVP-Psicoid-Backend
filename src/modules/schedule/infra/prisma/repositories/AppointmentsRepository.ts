import { prisma } from "@shared/prisma";
import { IAppointmentsRepository } from "@modules/schedule/domain/repositories/IAppointmentsRepository";
import { ICreateAppointment } from "@modules/schedule/domain/models/ICreateAppointment";
import {
	IAppointment,
	ICancel,
	ICancelResponse,
	IFindManyByCustomer,
	IFindManyByPsico,
	IUpdateStatus,
} from "@modules/schedule/domain/models/IAppointment";
import { IUpdateAppointment } from "@modules/schedule/domain/models/IUpdateAppointment";
import { APPOINTMENT_STATUS } from "@shared/utils/enums";

export class AppointmentsRepository implements IAppointmentsRepository {
	public create({
		psychologistId,
		customerId,
		createdBy,
		price,
		startsAt,
		endsAt,
	}: ICreateAppointment): Promise<IAppointment> {
		return prisma.appointment.create({
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
		return prisma.appointment.update({
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
	public async updateStatus({ id, status }: IUpdateStatus): Promise<void> {
		await prisma.appointment.update({ where: { id }, data: { status } });
	}

	public findOne(id: string): Promise<IAppointment | null> {
		return prisma.appointment.findUnique({
			where: { id },
			include: {
				closedAppointment: true,
				customer: { include: { profile: true } },
				psychologist: { include: { profile: true } },
			},
		});
	}
	public async findManyByPsico({
		psychologistId,
		pagination,
	}: IFindManyByPsico): Promise<IAppointment[]> {
		const { filter, sort, skip, order, take } = pagination;
		return prisma.appointment.findMany({
			where: { psychologistId, ...filter },
			orderBy: { [sort]: order },
			skip,
			take,
			include: {
				closedAppointment: true,
				customer: { include: { profile: true } },
				psychologist: { include: { profile: true } },
			},
		});
	}
	public async findManyByCustomer({
		customerId,
		pagination,
	}: IFindManyByCustomer): Promise<IAppointment[]> {
		const { filter, sort, skip, order, take } = pagination;
		return prisma.appointment.findMany({
			where: { customerId, ...filter },
			orderBy: { [sort]: order },
			skip,
			take,
			include: {
				closedAppointment: true,
				customer: { include: { profile: true } },
				psychologist: { include: { profile: true } },
			},
		});
	}
	public async cancel({
		appointmentId,
		closedBy,
		reason,
	}: ICancel): Promise<ICancelResponse> {
		return prisma.closedAppointment.create({
			data: {
				appointmentId,
				closedBy: closedBy ? closedBy : "TIME_EXPIRED",
				cancellationReason: reason,
				cancelAt: new Date(),
			},
			select: {
				appointment: {
					select: {
						psychologistId: true,
						customerId: true,
						closedAppointment: {
							select: { cancellationReason: true },
						},
					},
				},
			},
		});
	}
}
