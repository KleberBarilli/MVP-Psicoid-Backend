import { RedisCache } from "@shared/cache/RedisCache";
import { RedisKeys } from "@shared/utils/enums";
import { addHours } from "date-fns";
import { injectable, inject } from "tsyringe";
import { IUpdateAppointment } from "../domain/models/IUpdateAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";
import tz from "@config/tz";

@injectable()
export class UpdateAppointmentService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
		@inject("RedisCache") private redisCache: RedisCache,
	) {}
	public async execute(
		id: number,
		{
			psychologistId,
			customerId,
			price,
			status,
			startsAt,
			endsAt,
		}: IUpdateAppointment,
	): Promise<void> {
		await this.appointmentsRepository.update(id, {
			psychologistId,
			customerId,
			price,
			status,
			startsAt: addHours(startsAt, tz.BRAZIL_TZ),
			endsAt: addHours(endsAt, tz.BRAZIL_TZ),
		});

		await this.redisCache.invalidateKeysByPattern(
			`${RedisKeys.LIST_APPOINTMENTS_BY_PSICO}:${psychologistId}`,
		);
	}
}
