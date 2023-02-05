import { Address, Contact } from "@prisma/client";
import { IAddress, IAddressUpdated } from "./IAddress";
import { IContact } from "./IContact";

export interface IOffice {
	photos: string[];
	address: Address;
	contact: Contact;
}
export interface IOfficeEntity {
	photos: string[];
	address: IAddress;
	contact: IContact;
}
export interface IOfficeUpdated {
	photos: string[] | undefined;
	address: IAddressUpdated | undefined;
	contact: IContact | undefined;
}

export interface INormalizeOffice {
	address: {
		zipCode: string;
	};
	contact: IContact;
}
