import {
	ICredential,
	ICredentialResponse,
} from "@shared/interfaces/ICredential";
import { IUpdateCredential } from "../models/IUpdateCredentials";

export interface ICredentialsRepository {
	findById(id: bigint): Promise<ICredential | null>;
	findByEmail(email: string): Promise<ICredentialResponse | null>;
	findByToken(token: string): Promise<ICredential | null>;
	updateCredential(id: bigint, data: IUpdateCredential): Promise<ICredential>;
	updatePassword(id: bigint, password: string): Promise<ICredential>;
	updateToken(id: bigint, token: string): Promise<ICredential>;
	iAmPsico(id: bigint): Promise<ICredential | null>;
	iAmCustomer(id: bigint): Promise<ICredential | null>;
	iAmAdmin(id: bigint): Promise<ICredential | null>;
	deactivateAccount(id: bigint): Promise<ICredential>;
}
