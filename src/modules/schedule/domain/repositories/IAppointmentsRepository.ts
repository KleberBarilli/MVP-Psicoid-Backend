import { ICreateAppointment } from "../models/ICreateAppointment";
import {
	IAppointment,
	ICancel,
	ICancelResponse,
	IFindManyByCustomer,
	IFindManyByPsico,
	IUpdateStatus,
} from "../models/IAppointment";
import { IUpdateAppointment } from "../models/IUpdateAppointment";
import { APPOINTMENT_STATUS } from "@shared/utils/enums";

export interface IAppointmentsRepository {
	create(data: ICreateAppointment): Promise<IAppointment>;
	update(id: string, data: IUpdateAppointment): Promise<IAppointment>;
	findOne(id: string): Promise<IAppointment | null>;
	findManyByPsico({
		psychologistId,
		pagination,
	}: IFindManyByPsico): Promise<IAppointment[]>;
	findManyByCustomer({
		customerId,
		pagination,
	}: IFindManyByCustomer): Promise<IAppointment[]>;
	cancel({
		appointmentId,
		closedBy,
		reason,
	}: ICancel): Promise<ICancelResponse>;
	updateStatus({ id, status }: IUpdateStatus): Promise<void>;
}
