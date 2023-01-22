import { Appointment } from "@prisma/client";
import { RedisCache } from "@shared/cache/RedisCache";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { RedisKeys } from "@shared/utils/enums";
import { injectable, inject } from "tsyringe";
import { IAppointment, IFindManyByPsico } from "../domain/models/IAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";
import {
	AppointmentPresenter,
	ICustomAppointment,
	IFindManyCustomAppointments,
} from "../infra/http/presenters/AppointmentPresenter";

interface ISaveToRedisCache {
	psicoId: number;
	search: Record<string, any>;
	count: number;
	appointments: ICustomAppointment[];
}

interface IRecoverFromCache {
	psicoId: number;
	search: Record<string, any>;
}

interface IFindManyAppointments {
	psychologistId: number;
	pagination: IPagination;
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
			`${
				RedisKeys.LIST_APPOINTMENTS_BY_PSICO
			}:${psicoId}:${JSON.stringify(search)}`,
			[count, appointments],
		);
	}
	private async recoverFromCache({ psicoId, search }: IRecoverFromCache) {
		return this.redisCache.recover<any>(
			`${RedisKeys.LIST_PSICO}:${psicoId}${JSON.stringify(search)}:`,
		);
	}

	private async findManyAppointments({
		psychologistId,
		pagination,
	}: IFindManyAppointments) {
		const { count, appointments } =
			await this.appointmentsRepository.findManyByPsico({
				psychologistId,
				pagination,
			});

		const mappedAppointments = this.mapToEntity(appointments);

		await this.saveToRedisCache({
			psicoId: psychologistId,
			count,
			search: pagination.search,
			appointments: mappedAppointments,
		});

		return { count, appointments: mappedAppointments };
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
		const cachedAppointments = await this.recoverFromCache({
			psicoId: psychologistId,
			search: pagination.search,
		});

		if (cachedAppointments) {
			const count = cachedAppointments[0];
			const appointments = cachedAppointments[1];

			return { count, appointments };
		}

		return this.findManyAppointments({ psychologistId, pagination });
	}
}
