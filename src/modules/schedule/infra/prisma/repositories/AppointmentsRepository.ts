import { prisma } from "@shared/prisma";
import { IAppointmentsRepository } from "@modules/schedule/domain/repositories/IAppointmentsRepository";
import { ICreateAppointment } from "@modules/schedule/domain/models/ICreateAppointment";
import {
	IAppointment,
	ICancel,
	ICancelResponse,
	IFindManyAppointments,
	IFindManyAppointmentWithoutPagination,
	IFindManyByCustomer,
	IFindManyByPsico,
	IUpdateStatus,
} from "@modules/schedule/domain/models/IAppointment";
import {
	IUpdateAppointment,
	IUpdateAppointmentResponse,
} from "@modules/schedule/domain/models/IUpdateAppointment";

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
		id: bigint,
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
	public async updateStatus({
		id,
		status,
	}: IUpdateStatus): Promise<IUpdateAppointmentResponse> {
		return await prisma.appointment.update({
			where: { id },
			data: { status },
			select: { psychologistId: true, customerId: true },
		});
	}

	public findOne(id: bigint): Promise<IAppointment | null> {
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
	}: IFindManyByPsico): Promise<IFindManyAppointments> {
		const { filter, sort, skip, order, take } = pagination;

		const [count, appointments] = await Promise.all([
			prisma.appointment.count({
				where: { psychologistId, ...filter },
				orderBy: { [sort]: order },
				skip,
				take,
			}),
			prisma.appointment.findMany({
				where: { psychologistId, ...filter },
				orderBy: { [sort]: order },
				skip,
				take,
			}),
		]);

		return { count, appointments };
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
	public async findManyByPsicoWithoutPagination(
		psicoId: bigint,
	): Promise<IFindManyAppointmentWithoutPagination[]> {
		return prisma.appointment.findMany({
			where: { psychologistId: psicoId },
			select: { startsAt: true, endsAt: true },
		});
	}

	public async findManyByCustomerWithoutPagination(
		customerId: bigint,
	): Promise<IFindManyAppointmentWithoutPagination[]> {
		return prisma.appointment.findMany({
			where: { customerId },
			select: { startsAt: true, endsAt: true },
		});
	}
}
