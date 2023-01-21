import { IAppointment } from "@modules/schedule/domain/models/IAppointment";
import { AppointmentStatus } from "@prisma/client";

export interface ICustomAppointment {
	id: bigint;
	psychologistId bigint;
	customerId: bigint;
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
