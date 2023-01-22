import { Credential, Provider, Role } from "@prisma/client";

export class CredentialEntity implements Credential {
	id: number;
	integrationId: string;
	provider: Provider;
	email: string;
	password: string;
	tokenRecovery: string | null;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
	inactivatedAt: Date | null;
	lastLoginAt: Date | null;
	lastLoginIp: string | null;
}
