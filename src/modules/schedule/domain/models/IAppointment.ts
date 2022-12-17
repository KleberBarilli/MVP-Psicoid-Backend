import {
	AppointmentCompletedBy,
	AppointmentStatus,
	Role,
} from "@prisma/client";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

export interface IAppointment {
	id: string;
	psychologistId: string;
	customerId: string;
	createdBy: Role;
	status: AppointmentStatus;
	price: number | null;
	startsAt: Date;
	endsAt: Date;
	createdAt: Date;
	updatedAt: Date;
}

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
