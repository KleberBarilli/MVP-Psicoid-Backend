import { IProfile } from "@shared/interfaces/IProfile";
import { IOfficeEntity } from "@shared/interfaces/IOffice";

export interface IUpdatedPsychologist {
	id: number;
	profile: IProfile;
	office: IOfficeEntity;
	resume: string;
}
