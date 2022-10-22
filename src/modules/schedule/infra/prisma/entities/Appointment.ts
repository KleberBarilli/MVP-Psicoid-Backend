import { Appointment, AppointmentStatus, Role } from "@prisma/client";

export class AppointimentEntity implements Appointment {
	id: string;
	psychologistId: string;
	customerId: string;
	createdBy: Role;
	status: AppointmentStatus;
	cancellationReason: string | null;
	price: number | null;
	startsAt: Date;
	endsAt: Date;
	createdAt: Date;
	updatedAt: Date;
}