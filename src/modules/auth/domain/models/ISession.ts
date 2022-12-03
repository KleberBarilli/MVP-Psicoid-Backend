import { ICredentialResponse } from "@shared/interfaces/ICredential";

export interface ISession {
	user: ICredentialResponse;
	token: string;
}
