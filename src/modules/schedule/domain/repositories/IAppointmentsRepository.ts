import { ICreateAppointment } from "../models/ICreateAppointment";
import {
	IAppointment,
	ICancel,
	ICancelResponse,
	IFindManyAppointments,
	IFindManyAppointmentWithoutPagination,
	IFindManyByCustomer,
	IFindManyByPsico,
	IUpdateStatus,
} from "../models/IAppointment";
import {
	IUpdateAppointment,
	IUpdateAppointmentResponse,
} from "../models/IUpdateAppointment";

export interface IAppointmentsRepository {
	create(data: ICreateAppointment): Promise<IAppointment>;
	update(id: number, data: IUpdateAppointment): Promise<IAppointment>;
	findOne(id: number): Promise<IAppointment | null>;
	findManyByPsico({
		psychologistId,
		pagination,
	}: IFindManyByPsico): Promise<IFindManyAppointments>;
	findManyByCustomer({
		customerId,
		pagination,
	}: IFindManyByCustomer): Promise<IAppointment[]>;
	cancel({
		appointmentId,
		closedBy,
		reason,
	}: ICancel): Promise<ICancelResponse>;
	updateStatus({
		id,
		status,
	}: IUpdateStatus): Promise<IUpdateAppointmentResponse>;
	findManyByPsicoWithoutPagination(
		psicoId: number,
	): Promise<IFindManyAppointmentWithoutPagination[]>;
	findManyByCustomerWithoutPagination(
		customerId: number,
	): Promise<IFindManyAppointmentWithoutPagination[]>;
}
