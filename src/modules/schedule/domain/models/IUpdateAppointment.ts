import { AppointmentStatus } from "@prisma/client";

export interface IUpdateAppointment {
	psychologistId: string;
	customerId: string;
	price: number;
	status: AppointmentStatus;
	startsAt: Date;
	endsAt: Date;
}
