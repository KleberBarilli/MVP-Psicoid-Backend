import { ICredential, ICredentialResponse } from '@shared/interfaces/ICredential'
import { IUpdateCredential } from '../models/IUpdateCredentials'

export interface ICredentialsRepository {
	findById(id: string): Promise<ICredential | null>
	findByEmail(email: string): Promise<ICredentialResponse | null>
	findByToken(token: string): Promise<ICredential | null>
	updateCredential(id: string, data: IUpdateCredential): Promise<ICredential>
	updatePassword(id: string, password: string): Promise<ICredential>
	updateToken(id: string, token: string): Promise<ICredential>
	iAmPsico(id: string): Promise<ICredential | null>
	iAmCustomer(id: string): Promise<ICredential | null>
	iAmAdmin(id: string): Promise<ICredential | null>
	deactivateAccount(id: string): Promise<ICredential>
}
