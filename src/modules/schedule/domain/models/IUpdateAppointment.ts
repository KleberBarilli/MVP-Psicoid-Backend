import { AppointmentStatus } from "@prisma/client";

export interface IUpdateAppointment {
	psychologistId: string;
	pacientId: string;
	price: number;
	status: AppointmentStatus;
	cancellationReason: string | null;
	startsAt: Date;
	endsAt: Date;
}
