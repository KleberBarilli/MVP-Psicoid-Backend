import { IContact } from './IContact';
import { IAddress } from './IAddress';

export interface IIdentity {
	firstName: string;
	lastName: string;
	cpf: string;
	contact?: IContact;
	address: IAddress;
}
