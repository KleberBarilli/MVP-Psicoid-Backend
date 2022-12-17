import { APPOINTMENT_STATUS } from "@shared/utils/enums";
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
		await this.appointmentsRepository.updateStatus({
			id: appointmentId,
			status: APPOINTMENT_STATUS.canceled,
		});

		return this.appointmentsRepository.cancel({
			appointmentId,
			closedBy,
			reason,
		});
	}
}
