import { IContact } from "@shared/interfaces/IContact";
import { ICredential } from "@shared/interfaces/ICredential";
import { IProfile } from "@shared/interfaces/IProfile";

export interface ICreatePacient {
	credential: ICredential;
	profile: IProfile;
	contact: IContact;
}
