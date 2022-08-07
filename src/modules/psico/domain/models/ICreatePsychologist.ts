import { IContact } from 'src/shared/interfaces/IContact';
import { IAddress } from 'src/shared/interfaces/IAddress';
import { ICredential } from 'src/shared/interfaces/ICredential';
import { IIdentity } from 'src/shared/interfaces/IIdentity';
import { ICompany } from 'src/shared/interfaces/ICompany';
import { IPsychologist } from 'src/shared/interfaces/IPsichologyst';

export interface ICreatePsychologist {
	credential: ICredential;
	identity: IIdentity;
	contact: IContact;
	address: IAddress;
	company?: ICompany;
	types: any;
}
