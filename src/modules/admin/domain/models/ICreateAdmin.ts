import { ICredential } from "@shared/interfaces/ICredential";
import { IProfile } from "@shared/interfaces/IProfile";

export interface ICreateAdmin {
	credential: ICredential;
	profile: IProfile;
}
