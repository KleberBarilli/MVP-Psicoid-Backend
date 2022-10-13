import { IContact } from "@shared/interfaces/IContact";
import { ICredential } from "@shared/interfaces/ICredential";
import { IIdentity } from "@shared/interfaces/IIdentity";

export interface ICreatePacient {
	credential: ICredential;
	identity: IIdentity;
	contact: IContact;
}
