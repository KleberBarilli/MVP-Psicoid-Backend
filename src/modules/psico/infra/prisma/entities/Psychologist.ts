import { Psychologist, PsychologistType } from '@prisma/client';

export class PsychologistEntity implements Psychologist {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	companyId: string | null;
	types: PsychologistType[];
	createdAt: Date;
	updatedAt: Date;
}
