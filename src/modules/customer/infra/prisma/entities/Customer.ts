import { Customer, Psychologist } from "@prisma/client";

export class CustomerEntity implements Customer {
	id: number;
	integrationId: string;
	credentialId: number | null;
	profileId: number;
	guestId: number | null;
	selectedPsychologistId: number | null;
	createdAt: Date;
	updatedAt: Date;
	psychologists: Psychologist[];
}
