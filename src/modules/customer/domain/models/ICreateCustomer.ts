import { IContact } from "@shared/interfaces/IContact";
import { IProfile } from "@shared/interfaces/IProfile";

export interface ICreateCustomer {
	credential: any;
	profile: IProfile;
	contact: IContact;
}
