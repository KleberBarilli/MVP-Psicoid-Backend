import { IContact } from "@shared/interfaces/IContact";
import { IAddress } from "@shared/interfaces/IAddress";
import { ICredential } from "@shared/interfaces/ICredential";
import { IIdentity } from "@shared/interfaces/IIdentity";

export interface IUpdatePacient {
	credential: ICredential | null;
	identity: IIdentity | null;
	contact: IContact | null;
	address: IAddress | null;
}
