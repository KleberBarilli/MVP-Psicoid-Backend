import { ROLE_TYPE } from "@shared/utils/enums";

export interface ICreateAppointment {
	psychologistId: string;
	customerId: string;
	createdBy: ROLE_TYPE;
	price: number;
	startsAt: Date;
	endsAt: Date;
}
