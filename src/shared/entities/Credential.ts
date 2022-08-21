import { Credential, Provider, Role } from '@prisma/client';

export class CredentialEntity implements Credential {
	id: string;
	provider: Provider;
	email: string;
	password: string;
	tokenRecovery: string | null;
	role: Role;
	inactive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
