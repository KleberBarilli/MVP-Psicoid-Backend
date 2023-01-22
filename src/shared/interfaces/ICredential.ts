import { Provider, Role } from "@prisma/client";

export interface ICredential {
	id: number;
	provider: Provider;
	email: string;
	password: string;
	tokenRecovery: string | null;
	role: Role;
	inactivatedAt: Date | null;
	lastLoginAt: Date | null;
	lastLoginIp: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICredentialResponse {
	id: number;
	integrationId: string;
	email: string;
	password: string;
	role: Role;
	inactivatedAt: Date | null;
	psychologist: { id: number; integrationId: string } | null;
	customer: { id: number; integrationId: string } | null;
}
