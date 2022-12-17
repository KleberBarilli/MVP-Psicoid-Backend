import { add } from "date-fns";
import { injectable, inject } from "tsyringe";
import { IAppointment } from "../domain/models/IAppointment";
import { ICreateAppointment } from "../domain/models/ICreateAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";
import { checkAvailability } from "../shared/check-schedule-availability";

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
			startsAt: add(startsAt, { hours: Number(process.env.TZ_BRAZIL) }),
			endsAt: add(endsAt, { hours: Number(process.env.TZ_BRAZIL) }),
		});
		return this.appointmentsRepository.create({
			psychologistId,
			customerId,
			createdBy,
			price,
			startsAt: add(startsAt, { hours: 3 }),
			endsAt: add(endsAt, { hours: 3 }),
		});
	}
}
