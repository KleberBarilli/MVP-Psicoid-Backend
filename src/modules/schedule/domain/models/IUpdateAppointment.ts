import { AppointmentStatus } from "@prisma/client";

export interface IUpdateAppointment {
	psychologistId: string;
	customerId: string;
	price: number;
	status: AppointmentStatus;
	cancellationReason: string | null;
	startsAt: Date;
	endsAt: Date;
}
