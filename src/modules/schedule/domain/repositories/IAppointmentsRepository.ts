import { ICreateAppointment } from "../models/ICreateAppointment";
import { IAppointment } from "../models/IAppointment";

export interface IAppointmentsRepository {
	create(data: ICreateAppointment): Promise<IAppointment>;
}
