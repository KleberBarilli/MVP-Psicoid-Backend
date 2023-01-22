import {
	ICredential,
	ICredentialResponse,
} from "@shared/interfaces/ICredential";
import { IUpdateCredential } from "../models/IUpdateCredentials";

export interface ICredentialsRepository {
	findById(id: number): Promise<ICredential | null>;
	findByEmail(email: string): Promise<ICredentialResponse | null>;
	findByToken(token: string): Promise<ICredential | null>;
	updateCredential(id: number, data: IUpdateCredential): Promise<ICredential>;
	updatePassword(id: number, password: string): Promise<ICredential>;
	updateToken(id: number, token: string): Promise<ICredential>;
	iAmPsico(id: number): Promise<ICredential | null>;
	iAmCustomer(id: number): Promise<ICredential | null>;
	iAmAdmin(id: number): Promise<ICredential | null>;
	deactivateAccount(id: number): Promise<ICredential>;
}
