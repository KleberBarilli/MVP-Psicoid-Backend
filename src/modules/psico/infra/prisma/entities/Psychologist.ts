import { Psychologist } from "@prisma/client";

export class PsychologistEntity implements Psychologist {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	companyId: string | null;
	officeId: string | null;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
}
