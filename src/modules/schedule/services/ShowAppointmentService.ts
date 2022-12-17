import { injectable, inject } from "tsyringe";
import { IAppointment } from "../domain/models/IAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";

@injectable()
export class ShowAppointmentService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
	) {}
	public async execute(appointmentId: string): Promise<IAppointment | null> {
		return this.appointmentsRepository.findOne(appointmentId);
	}
}
