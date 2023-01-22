import { AppointmentStatus } from "@prisma/client";

export interface IUpdateAppointment {
	psychologistId: number;
	customerId: number;
	price: number;
	status: AppointmentStatus;
	startsAt: Date;
	endsAt: Date;
}

export interface IUpdateAppointmentResponse {
	customerId: number;
	psychologistId: number;
}
