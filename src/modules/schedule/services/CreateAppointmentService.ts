import { injectable, inject } from "tsyringe";
import { IAppointment } from "../domain/models/IAppointment";
import { ICreateAppointment } from "../domain/models/ICreateAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";

@injectable()
export default class CreateReviewService {
	constructor(
		@inject("AppointmentsRepository")
		public appointmentsRepository: IAppointmentsRepository,
	) {}
	public async execute({
		psychologistId,
		pacientId,
		createdBy,
		price,
		startsAt,
		endsAt,
	}: ICreateAppointment): Promise<IAppointment> {
		return this.appointmentsRepository.create({
			psychologistId,
			pacientId,
			createdBy,
			price,
			startsAt,
			endsAt,
		});
	}
}
