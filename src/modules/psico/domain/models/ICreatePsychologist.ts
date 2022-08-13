import { IContact } from '@shared/interfaces/IContact';
import { IAddress } from '@shared/interfaces/IAddress';
import { ICredential } from '@shared/interfaces/ICredential';
import { IIdentity } from '@shared/interfaces/IIdentity';
import { ICompany } from '@shared/interfaces/ICompany';
import { IPsychologist } from '@shared/interfaces/IPsichologyst';

export interface ICreatePsychologist {
	credential: ICredential;
	identity: IIdentity;
	contact: IContact;
	address: IAddress;
	company?: ICompany;
	types: any;
}