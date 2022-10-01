import { IContact } from "@shared/interfaces/IContact";
import { IAddress } from "@shared/interfaces/IAddress";
import { IIdentity } from "@shared/interfaces/IIdentity";

export interface IUpdatePacient {
	selectedPsychologistId: string | null;
	identity: IIdentity | null;
	contact: IContact | null;
	address: IAddress | null;
}
