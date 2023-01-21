import {
	Appointment,
	AppointmentCompletedBy,
	AppointmentStatus,
	Role,
} from "@prisma/client";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { APPOINTMENT_STATUS } from "@shared/utils/enums";

export type IAppointment = Appointment;

export interface IListAppointment {
	count: number;
	IAppointment: [];
}
export interface IFindManyByPsico {
	psychologistId: string;
	pagination: IPagination;
}

export interface IFindManyByCustomer {
	customerId: string;
	pagination: IPagination;
}

export interface ICancel {
	appointmentId: string;
	closedBy: AppointmentCompletedBy;
	reason: string | null;
}

export interface ICancelResponse {
	appointment: {
		psychologistId: string;
		customerId: string;
		closedAppointment: { cancellationReason: string | null } | null;
	};
}

export interface IUpdateStatus {
	id: string;
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
