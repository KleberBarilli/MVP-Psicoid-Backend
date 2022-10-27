import { ICreateAppointment } from '../models/ICreateAppointment'
import { IAppointment } from '../models/IAppointment'
import { IUpdateAppointment } from '../models/IUpdateAppointment'

export interface IAppointmentsRepository {
	create(data: ICreateAppointment): Promise<IAppointment>
	update(id: string, data: IUpdateAppointment): Promise<IAppointment>
}
