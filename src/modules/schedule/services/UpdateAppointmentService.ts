import { add } from "date-fns";
import { injectable, inject } from "tsyringe";
import { IAppointment } from "../domain/models/IAppointment";
import { IUpdateAppointment } from "../domain/models/IUpdateAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";

@injectable()
export class UpdateAppointmentService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
	) {}
	public async execute(
		id: string,
		{
			psychologistId,
			customerId,
			price,
			status,
			startsAt,
			endsAt,
		}: IUpdateAppointment,
	): Promise<IAppointment> {
		return this.appointmentsRepository.update(id, {
			psychologistId,
			customerId,
			price,
			status,
			startsAt: add(startsAt, { hours: 3 }),
			endsAt: add(endsAt, { hours: 3 }),
		});
	}
}
