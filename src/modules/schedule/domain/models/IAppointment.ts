import {
	AppointmentCompletedBy,
	AppointmentStatus,
	Role,
} from "@prisma/client";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { APPOINTMENT_STATUS } from "@shared/utils/enums";

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
