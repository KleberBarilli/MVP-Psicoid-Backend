import { addHours } from "date-fns";
import { injectable, inject } from "tsyringe";
import { IAppointment } from "../domain/models/IAppointment";
import { ICreateAppointment } from "../domain/models/ICreateAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";
import { checkAvailability } from "../shared/check-schedule-availability";
import tz from "@config/tz";

@injectable()
export class CreateAppointmentService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	public async execute({
		psychologistId,
		customerId,
		createdBy,
		price,
		startsAt,
		endsAt,
	}: ICreateAppointment): Promise<IAppointment> {
		await checkAvailability({
			psychologistId,
			customerId,
			startsAt: addHours(startsAt, tz.BRAZIL_TZ),
			endsAt: addHours(endsAt, tz.BRAZIL_TZ),
		});
		return this.appointmentsRepository.create({
			psychologistId,
			customerId,
			createdBy,
			price,
			startsAt: addHours(startsAt, tz.BRAZIL_TZ),
			endsAt: addHours(endsAt, tz.BRAZIL_TZ),
		});
	}
}
