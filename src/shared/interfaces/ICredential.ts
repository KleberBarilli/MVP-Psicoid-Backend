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
