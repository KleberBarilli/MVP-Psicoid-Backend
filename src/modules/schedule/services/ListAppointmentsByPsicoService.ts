import { injectable, inject } from "tsyringe";
import { IAppointment, IFindManyByPsico } from "../domain/models/IAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";

@injectable()
export class ListAppointmentsByPsicoService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
	) {}
	public async execute({
		psychologistId,
		pagination,
	}: IFindManyByPsico): Promise<IAppointment[]> {
		return this.appointmentsRepository.findManyByPsico({
			psychologistId,
			pagination,
		});
	}
}
