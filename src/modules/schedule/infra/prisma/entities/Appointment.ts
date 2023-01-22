import { Appointment, AppointmentStatus, Role } from "@prisma/client";

export class AppointimentEntity implements Appointment {
	id: number;
	integrationId: string;
	psychologistId: number;
	customerId: number;
	createdBy: Role;
	status: AppointmentStatus;
	cancellationReason: string | null;
	price: number | null;
	startsAt: Date;
	endsAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
