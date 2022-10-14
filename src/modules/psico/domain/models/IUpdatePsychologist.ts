import { IProfile } from "@shared/interfaces/IProfile";
import { IOffice } from "@shared/interfaces/IOffice";

export interface IUpdatePsychologist {
	profile: IProfile | null;
	office: IOffice | null;
	resume: string | null;
}
