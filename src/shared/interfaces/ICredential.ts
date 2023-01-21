import { Provider, Role } from "@prisma/client";

export interface ICredential {
	id: bigint;
	provider: Provider;
	email: string;
	password: string;
	tokenRecovery: string | null;
	role: Role;
	inactive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICredentialResponse {
	id: bigint;
	email: string;
	password: string;
	role: Role;
	inactive: boolean;
	psychologist: { id: number } | null;
	customer: { id: number } | null;
}
