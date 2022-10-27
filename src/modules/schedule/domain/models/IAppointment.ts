import { AppointmentStatus, Role } from '@prisma/client'

export interface IAppointment {
	id: string
	psychologistId: string
	customerId: string
	createdBy: Role
	status: AppointmentStatus
	cancellationReason: string | null
	price: number | null
	startsAt: Date
	endsAt: Date
	createdAt: Date
	updatedAt: Date
}

export interface IListAppointment {
	count: number
	IAppointment: []
}
