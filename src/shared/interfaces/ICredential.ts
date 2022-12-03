import { Provider, Role } from "@prisma/client";

export interface ICredential {
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

export interface ICredentialResponse {
	id: string;
	email: string;
	password: string;
	role: Role;
	inactive: boolean;
	psychologist: { id: string } | null;
	customer: { id: string } | null;
}
