import { Address, Contact } from "@prisma/client";

export interface IOffice {
	photos: string[];
	address: Address;
	contact: Contact;
}
