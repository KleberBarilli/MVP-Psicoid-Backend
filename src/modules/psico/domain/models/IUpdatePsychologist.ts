import { IContact } from "@shared/interfaces/IContact";
import { IAddress } from "@shared/interfaces/IAddress";
import { IIdentity } from "@shared/interfaces/IIdentity";
import { IOffice } from "@shared/interfaces/IOffice";

export interface IUpdatePsychologist {
	identity: IIdentity | null;
	contact: IContact | null;
	address: IAddress | null;
	office: IOffice | null;
	resume: string | null;
}
