import { add } from "date-fns";
import { injectable, inject } from "tsyringe";
import { IAppointment } from "../domain/models/IAppointment";
import { ICreateAppointment } from "../domain/models/ICreateAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";

interface IRequest {
	starts: Date;
	ends: Date;
	psychologistId: string;
}
@injectable()
export class CreateAppointmentService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	private async dateIntervals({ starts, ends, psychologistId }: IRequest) {
		//shedules repo get
	}

	public async execute({
		psychologistId,
		customerId,
		createdBy,
		price,
		startsAt,
		endsAt,
	}: ICreateAppointment): Promise<IAppointment> {
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
