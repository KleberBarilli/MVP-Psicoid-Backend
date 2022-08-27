import { BrazilState } from "@prisma/client";

export interface IAddress {
	zipCode: string;
	street: string;
	number: string;
	neighborhood: string;
	city: string;
	state: BrazilState;
}
