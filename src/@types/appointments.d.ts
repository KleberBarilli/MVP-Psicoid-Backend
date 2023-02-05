import { AppointmentStatus, Role } from "@prisma/client";

interface Appointment {
	table: string;
	data: [
		{
			psychologistId: number;
			patientId: number;
			createdBy: Role;
			status: AppointmentStatus;
			price: number;
			schedule: {
				startsAt: Date;
				endsAt: Date;
			};
		},
	];
}

declare const rawAppointments: Appointment[];

export default rawAppointments;
