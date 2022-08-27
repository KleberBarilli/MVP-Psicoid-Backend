import { Address, Contact } from "@prisma/client";

export interface ICompany {
	cnpj: string;
	name: string;
	tradingName: string;
	address: Address;
	contact: Contact;
}
