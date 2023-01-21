import { IContact } from "@shared/interfaces/IContact";
import { IProfile } from "@shared/interfaces/IProfile";

export interface IUpdateCustomer {
	id: bigint;
	selectedPsychologistId: string | null;
	profile: IProfile;
	contact: IContact;
}
