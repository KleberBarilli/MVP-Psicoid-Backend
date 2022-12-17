import { injectable, inject } from "tsyringe";
import {
	IAppointment,
	IFindManyByCustomer,
} from "../domain/models/IAppointment";
import { IAppointmentsRepository } from "../domain/repositories/IAppointmentsRepository";

@injectable()
export class ListAppointmentsByCustomerService {
	constructor(
		@inject("AppointmentsRepository")
		private appointmentsRepository: IAppointmentsRepository,
	) {}
	public async execute({
		customerId,
		pagination,
	}: IFindManyByCustomer): Promise<IAppointment[]> {
		return this.appointmentsRepository.findManyByCustomer({
			customerId,
			pagination,
		});
	}
}
