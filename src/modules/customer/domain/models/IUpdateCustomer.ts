import { IContact } from "@shared/interfaces/IContact";
import { IProfile } from "@shared/interfaces/IProfile";

export interface IUpdateCustomer {
	id: number;
	selectedPsychologistId: number | null;
	profile: IProfile;
	contact: IContact;
}
