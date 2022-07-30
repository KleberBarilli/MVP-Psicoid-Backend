import { Provider, Role } from '@prisma/client';

export interface ICredential {
	email: string;
	password: string;
	provider: Provider;
	roles: Role;
	tokenRecovery?: string;
	inactive: boolean;
}
