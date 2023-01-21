import { Customer } from "@prisma/client";

export class CustomerEntity implements Customer {
	id: bigint;
	credentialId: string | null;
	profileId: string | null;
	guestId: string | null;
	selectedPsychologistId: string | null;
	createdAt: Date;
	updatedAt: Date;
}
