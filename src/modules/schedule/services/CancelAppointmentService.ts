import { injectable, inject } from "tsyringe";
import { ICancelResponse } from "../domain/models/IAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";

interface IRequest {
	appointmentId: string;
	closedBy: any;
	reason: string | null;
}
@injectable()
export class CancelAppointmentService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
	) {}
	public async execute({
		appointmentId,
		closedBy,
		reason,
	}: IRequest): Promise<ICancelResponse> {
		return await this.appointmentsRepository.cancel({
			appointmentId,
			closedBy,
			reason,
		});
	}
}
