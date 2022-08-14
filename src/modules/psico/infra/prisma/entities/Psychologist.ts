import { Psychologist } from '@prisma/client';

export class PsychologistEntity implements Psychologist {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	companyId: string | null;
	createdAt: Date;
	updatedAt: Date;
}
