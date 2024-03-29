import { ICredential } from "@shared/interfaces/ICredential";
import { IProfile } from "@shared/interfaces/IProfile";
import { IOfficeEntity } from "@shared/interfaces/IOffice";

export interface ICreatePsychologist {
	credential: ICredential;
	profile: IProfile;
	office: IOfficeEntity;
	resume?: string;
}
