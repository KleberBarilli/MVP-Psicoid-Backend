import { AppointmentStatus } from "@prisma/client";

export interface IUpdateAppointment {
	psychologistId: bigint;
	customerId: bigint;
	price: number;
	status: AppointmentStatus;
	startsAt: Date;
	endsAt: Date;
}

export interface IUpdateAppointmentResponse {
	customerId: bigint;
	psychologistId: bigint;
}
