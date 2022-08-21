import { Pacient } from '@prisma/client';

export class PacientEntity implements Pacient {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	createdAt: Date;
	updatedAt: Date;
}
