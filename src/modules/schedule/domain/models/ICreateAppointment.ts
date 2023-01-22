import { ROLE_TYPE } from "@shared/utils/enums";

export interface ICreateAppointment {
	psychologistId: number;
	customerId: number;
	createdBy: ROLE_TYPE;
	price: number;
	startsAt: Date;
	endsAt: Date;
}
