import { Customer } from "@prisma/client";

export class CustomerEntity implements Customer {
	id: bigint;
	credentialId: string | null;
	profileId: bigint | null;
	guestId: string | null;
	selectedPsychologistId: string | null;
	createdAt: Date;
	updatedAt: Date;
}
