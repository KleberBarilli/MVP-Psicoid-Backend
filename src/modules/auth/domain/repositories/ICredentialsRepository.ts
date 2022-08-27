import { ICredential } from "@shared/interfaces/ICredential";

export interface ICredentialsRepository {
	findById(id: string): Promise<ICredential | null>;
	findByEmail(email: string): Promise<ICredential | null>;
	findByToken(token: string): Promise<ICredential | null>;
	updatePassword(id: string, password: string): Promise<ICredential>;
	updateToken(id: string, token: string): Promise<ICredential>;
	iAmPsico(id: string): Promise<ICredential | null>;
	iAmPacient(id: string): Promise<ICredential | null>;
}
