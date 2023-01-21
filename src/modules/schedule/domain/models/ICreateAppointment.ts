import { ROLE_TYPE } from "@shared/utils/enums";

export interface ICreateAppointment {
	psychologistId bigint;
	customerId: bigint;
	createdBy: ROLE_TYPE;
	price: number;
	startsAt: Date;
	endsAt: Date;
}
