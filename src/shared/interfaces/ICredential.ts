import { Provider, Role } from "@prisma/client";

export interface ICredential {
	id: bigint;
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
	id: bigint;
	integrationId: string;
	email: string;
	password: string;
	role: Role;
	inactivatedAt: Date | null;
	psychologist: { id: bigint; integrationId: string } | null;
	customer: { id: bigint; integrationId: string } | null;
}
