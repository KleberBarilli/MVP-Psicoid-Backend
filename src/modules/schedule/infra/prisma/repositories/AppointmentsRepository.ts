import { PrismaClient } from "@prisma/client";
import { IAppointmentsRepository } from "@modules/schedule/domain/repositories/IAppointmentsRepository";
import { ICreateAppointment } from "@modules/schedule/domain/models/ICreateAppointment";
import { IAppointment } from "@modules/schedule/domain/models/IAppointment";

export default class AppointmentsRepository implements IAppointmentsRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public create({
		psychologistId,
		pacientId,
		createdBy,
		price,
		startsAt,
		endsAt,
	}: ICreateAppointment): Promise<IAppointment> {
		console.log("IHOSDAHJKDASHJKASDHJKSADASDJHSDAKASDH");
		console.log(psychologistId, pacientId, createdBy, price, startsAt, endsAt);
		return this.#prisma.appointment.create({
			data: {
				createdBy,
				price,
				startsAt,
				endsAt,
				psychologist: { connect: { id: psychologistId } },
				pacient: { connect: { id: pacientId } },
			},
		});
	}
}
