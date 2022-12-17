import { ICreateAppointment } from "../models/ICreateAppointment";
import {
	IAppointment,
	ICancel,
	IFindManyByCustomer,
	IFindManyByPsico,
} from "../models/IAppointment";
import { IUpdateAppointment } from "../models/IUpdateAppointment";

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
	cancel({ appointmentId, profile, reason }: ICancel): Promise<void>;
}
