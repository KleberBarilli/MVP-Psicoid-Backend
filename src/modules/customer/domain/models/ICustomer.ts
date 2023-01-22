import { Psychologist } from "@prisma/client";

export interface ICustomer {
	id: bigint;
	credentialId: string | null;
	profileId: bigint | null;
	guestId: string | null;
	selectedPsychologistId: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICustomerEntity {
	id: bigint;
	credentialId: string | null;
	profileId: bigint | null;
	guestId: string | null;
	selectedPsychologistId: string | null;
	createdAt: Date;
	updatedAt: Date;
	psychologists: Psychologist[];
}
