import { Psychologist } from "@prisma/client";

export interface ICustomer {
	id: bigint;
	credentialId: bigint | null;
	profileId: bigint | null;
	guestId: bigint | null;
	selectedPsychologistId: bigint | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICustomerEntity {
	id: bigint;
	credentialId: bigint | null;
	profileId: bigint | null;
	guestId: bigint | null;
	selectedPsychologistId: bigint | null;
	createdAt: Date;
	updatedAt: Date;
	psychologists: Psychologist[];
}
