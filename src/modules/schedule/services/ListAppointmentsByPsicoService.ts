import { Appointment } from "@prisma/client";
import { RedisCache } from "@shared/cache/RedisCache";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { IAppointment, IFindManyByPsico } from "../domain/models/IAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";
import {
	AppointmentPresenter,
	IFindManyCustomAppointments,
} from "../infra/http/presenters/AppointmentPresenter";

interface ISaveToRedisCache {
	psicoId: string;
	search: Record<string, any>;
	count: number;
	appointments: IAppointment[];
}
@injectable()
export class ListAppointmentsByPsicoService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
		@inject("RedisCache") private redisCache: RedisCache,
	) {}

	private async saveToRedisCache({
		psicoId,
		search,
		count,
		appointments,
	}: ISaveToRedisCache) {
		return this.redisCache.save(
			`${RedisKeys.LIST_APPOINTMENTS_BY_PSICO}:${JSON.stringify(
				search,
			)}:${psicoId}`,
			[count, appointments],
		);
	}

	private mapToEntity(appointments: IAppointment[]) {
		const appointmentsMapped = appointments.map(
			(appointment: Appointment) => {
				return AppointmentPresenter.toHTTP(appointment);
			},
		);
		return appointmentsMapped;
	}

	public async execute({
		psychologistId,
		pagination,
	}: IFindManyByPsico): Promise<IFindManyCustomAppointments> {
		const { count, appointments } =
			await this.appointmentsRepository.findManyByPsico({
				psychologistId,
				pagination,
			});

		const mappedAppointments = this.mapToEntity(appointments);

		return {
			count,
			appointments: mappedAppointments,
		};
	}
}
