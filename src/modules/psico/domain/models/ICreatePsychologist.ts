import { ICredential } from "@shared/interfaces/ICredential";
import { IIdentity } from "@shared/interfaces/IIdentity";
import { IOffice } from "@shared/interfaces/IOffice";

export interface ICreatePsychologist {
	credential: ICredential;
	identity: IIdentity;
	office: IOffice;
	resume?: string;
}
