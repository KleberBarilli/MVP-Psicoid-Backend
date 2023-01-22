import { Appointment, AppointmentCompletedBy } from "@prisma/client";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { APPOINTMENT_STATUS } from "@shared/utils/enums";

export type IAppointment = Appointment;

export interface IListAppointment {
	count: number;
	IAppointment: [];
}
export interface IFindManyByPsico {
	psychologistId: number;
	pagination: IPagination;
}

export interface IFindManyByCustomer {
	customerId: number;
	pagination: IPagination;
}

export interface ICancel {
	appointmentId: number;
	closedBy: AppointmentCompletedBy;
	reason: string | null;
}

export interface ICancelResponse {
	appointment: {
		psychologistId: number;
		customerId: number;
		closedAppointment: { cancellationReason: string | null } | null;
	};
}

export interface IUpdateStatus {
	id: number;
	status: APPOINTMENT_STATUS;
}

export interface IFindManyAppointmentWithoutPagination {
	startsAt: Date;
	endsAt: Date;
}

export interface IFindManyAppointments {
	count: number;
	appointments: IAppointment[];
}
