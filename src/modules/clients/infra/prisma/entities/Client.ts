import { Client } from '@prisma/client';

export class ClientEntity implements Client {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	createdAt: Date;
	updatedAt: Date;
}
