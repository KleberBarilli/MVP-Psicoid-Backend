import { IContact } from "@shared/interfaces/IContact";
import { IProfile } from "@shared/interfaces/IProfile";

export interface IUpdatePacient {
	selectedPsychologistId: string | null;
	profile: IProfile;
	contact: IContact;
}
