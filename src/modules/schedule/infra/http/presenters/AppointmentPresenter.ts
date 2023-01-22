import { IAppointment } from "@modules/schedule/domain/models/IAppointment";
import { AppointmentStatus } from "@prisma/client";

export interface ICustomAppointment {
	id: number;
	psychologistId: number;
	customerId: number;
	status: AppointmentStatus;
	starts: Date;
	ends: Date;
}

export interface IFindManyCustomAppointments {
	count: number;
	appointments: ICustomAppointment[];
}

export class AppointmentPresenter {
	static toHTTP(appointment: IAppointment) {
		return {
			id: appointment.id,
			psychologistId: appointment.psychologistId,
			customerId: appointment.customerId,
			status: appointment.status,
			starts: appointment.startsAt,
			ends: appointment.endsAt,
		};
	}
}
