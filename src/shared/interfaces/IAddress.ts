import { BrazilState } from "@prisma/client";

export interface IAddress {
	zipCode: string;
	street: string;
	number: string;
	neighborhood: string;
	city: string;
	state: BrazilState;
	latitude: number | undefined;
	longitude: number | undefined;
}

export interface IAddressUpdated {
	zipCode: string | undefined;
	street: string | undefined;
	number: string | undefined;
	neighborhood: string | undefined;
	city: string | undefined;
	state: BrazilState | undefined;
	latitude: number | undefined;
	longitude: number | undefined;
}
