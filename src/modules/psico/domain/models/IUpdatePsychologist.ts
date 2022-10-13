import { IIdentity } from "@shared/interfaces/IIdentity";
import { IOffice } from "@shared/interfaces/IOffice";

export interface IUpdatePsychologist {
	identity: IIdentity;
	office: IOffice;
	resume: string;
}
