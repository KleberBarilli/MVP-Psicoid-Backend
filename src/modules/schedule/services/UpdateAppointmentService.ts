import { RedisCache } from "@shared/cache/RedisCache";
import { RedisKeys } from "@shared/utils/enums";
import { add } from "date-fns";
import { injectable, inject } from "tsyringe";
import { IUpdateAppointment } from "../domain/models/IUpdateAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";

@injectable()
export class UpdateAppointmentService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
		@inject("RedisCache") private redisCache: RedisCache,
	) {}
	public async execute(
		id: bigint,
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
			startsAt: add(startsAt, { hours: 3 }),
			endsAt: add(endsAt, { hours: 3 }),
		});

		await this.redisCache.invalidateKeysByPattern(
			`${RedisKeys.LIST_APPOINTMENTS_BY_PSICO}:${psychologistId}`,
		);
	}
}
