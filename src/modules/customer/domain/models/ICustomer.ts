import { Psychologist } from "@prisma/client";

export interface ICustomer {
	id: number;
	credentialId: number | null;
	profileId: number | null;
	guestId: number | null;
	selectedPsychologistId: number | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICustomerEntity {
	id: number;
	credentialId: number | null;
	profileId: number | null;
	guestId: number | null;
	selectedPsychologistId: number | null;
	createdAt: Date;
	updatedAt: Date;
	psychologists: Psychologist[];
}
