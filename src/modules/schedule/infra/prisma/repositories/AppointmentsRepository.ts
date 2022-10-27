import { PrismaClient } from '@prisma/client'
import { IAppointmentsRepository } from '@modules/schedule/domain/repositories/IAppointmentsRepository'
import { ICreateAppointment } from '@modules/schedule/domain/models/ICreateAppointment'
import { IAppointment } from '@modules/schedule/domain/models/IAppointment'
import { IUpdateAppointment } from '@modules/schedule/domain/models/IUpdateAppointment'

export default class AppointmentsRepository implements IAppointmentsRepository {
	#prisma
	constructor() {
		this.#prisma = new PrismaClient()
	}

	public create({
		psychologistId,
		customerId,
		createdBy,
		price,
		startsAt,
		endsAt,
	}: ICreateAppointment): Promise<IAppointment> {
		return this.#prisma.appointment.create({
			data: {
				createdBy,
				price,
				startsAt,
				endsAt,
				psychologist: { connect: { id: psychologistId } },
				customer: { connect: { id: customerId } },
			},
		})
	}

	public update(
		id: string,
		{
			psychologistId,
			customerId,
			price,
			status,
			cancellationReason,
			endsAt,
			startsAt,
		}: IUpdateAppointment,
	): Promise<IAppointment> {
		return this.#prisma.appointment.update({
			where: { id },
			data: {
				price,
				status,
				cancellationReason,
				endsAt,
				startsAt,
				psychologist: { connect: { id: psychologistId } },
				customer: { connect: { id: customerId } },
			},
		})
	}
}
