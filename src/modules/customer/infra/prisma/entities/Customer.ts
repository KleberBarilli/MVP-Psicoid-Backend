import { IPsychologist } from "@modules/psico/domain/models/IPsychologist";
import { Customer } from "@prisma/client";

export class CustomerEntity implements Customer {
	id: bigint;
	integrationId: string;
	credentialId: bigint | null;
	profileId: bigint;
	guestId: bigint | null;
	selectedPsychologistId: bigint | null;
	createdAt: Date;
	updatedAt: Date;
	psychologists: IPsychologist[];
}
