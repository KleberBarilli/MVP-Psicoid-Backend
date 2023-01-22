import { AppointmentCompletedBy, TypeNotification } from "@prisma/client";
import { RedisCache } from "@shared/cache/RedisCache";
import Queue from "@shared/lib/bull/Queue";
import { APPOINTMENT_STATUS, RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";

interface IRequest {
	appointmentId: number;
	closedBy: AppointmentCompletedBy;
	reason: string | null;
	profileId: number;
}

interface INotify {
	appointmentId: number;
	psychologistId: number;
	customerId: number;
	cancellationReason: string | null;
}

interface IUpdateStatus {
	appointmentId: number;
	status: APPOINTMENT_STATUS;
}
@injectable()
export class CancelAppointmentService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
		@inject("RedisCache") private redisCache: RedisCache,
	) {}

	private async notify({
		appointmentId,
		cancellationReason,
		customerId,
		psychologistId,
	}: INotify) {
		await Queue.add("CreateNotification", {
			type: TypeNotification.CANCEL_APPOINTMENT,
			data: {
				appointmentId,
				psychologistId,
				customerId,
				cancellationReason,
			},
			views: { psychologistId, customerId },
		});
	}

	private async updateStatus({
		appointmentId,
		status,
	}: IUpdateStatus): Promise<void> {
		await this.appointmentsRepository.updateStatus({
			id: appointmentId,
			status,
		});
	}
	public async execute({
		appointmentId,
		closedBy,
		reason,
	}: IRequest): Promise<void> {
		const closed = await this.appointmentsRepository.cancel({
			appointmentId,
			closedBy,
			reason,
		});

		await this.updateStatus({
			appointmentId,
			status: APPOINTMENT_STATUS.canceled,
		});

		await this.notify({
			appointmentId,
			cancellationReason: reason,
			customerId: closed.appointment.customerId,
			psychologistId: closed.appointment.psychologistId,
		});

		await this.redisCache.invalidateKeysByPattern(
			`${RedisKeys.LIST_APPOINTMENTS_BY_PSICO}:${closed.appointment.psychologistId}`,
		);
		await this.redisCache.invalidateKeysByPattern(
			`${RedisKeys.LIST_APPOINTMENTS_BY_CUSTOMER}:${closed.appointment.customerId}`,
		);
	}
}
