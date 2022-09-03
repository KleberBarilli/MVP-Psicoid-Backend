import { ICredential } from "@shared/interfaces/ICredential";
import { IUpdateCredential } from "../models/IUpdateCredentials";

export interface ICredentialsRepository {
	findById(id: string): Promise<ICredential | null>;
	findByEmail(email: string): Promise<ICredential | null>;
	findByToken(token: string): Promise<ICredential | null>;
	updateCredential(id: string, data: IUpdateCredential): Promise<ICredential>;
	updatePassword(id: string, password: string): Promise<ICredential>;
	updateToken(id: string, token: string): Promise<ICredential>;
	iAmPsico(id: string): Promise<ICredential | null>;
	iAmPacient(id: string): Promise<ICredential | null>;
	deactivateAccount(id: string): Promise<ICredential>;
}
