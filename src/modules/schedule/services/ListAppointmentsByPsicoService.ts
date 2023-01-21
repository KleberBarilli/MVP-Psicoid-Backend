import { Appointment } from "@prisma/client";
import { injectable, inject } from "tsyringe";
import { IAppointment, IFindManyByPsico } from "../domain/models/IAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";
import {
	AppointmentPresenter,
	IFindManyCustomAppointments,
} from "../infra/http/presenters/AppointmentPresenter";

@injectable()
export class ListAppointmentsByPsicoService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	private mapToEntity(appointments: IAppointment[]) {
		const appointmentsMapped = appointments.map(
			(appointment: Appointment) => {
				return AppointmentPresenter.toHTTP(appointment);
			},
		);
		return appointmentsMapped;
	}

	public async execute({
		psychologistId,
		pagination,
	}: IFindManyByPsico): Promise<IFindManyCustomAppointments> {
		const { count, appointments } =
			await this.appointmentsRepository.findManyByPsico({
				psychologistId,
				pagination,
			});

		const mappedAppointments = this.mapToEntity(appointments);

		return {
			count,
			appointments: mappedAppointments,
		};
	}
}
