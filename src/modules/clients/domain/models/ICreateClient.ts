import { IContact } from 'src/shared/interfaces/IContact';
import { IAddress } from 'src/shared/interfaces/IAddress';
import { ICredential } from 'src/shared/interfaces/ICredential';
import { IIdentity } from 'src/shared/interfaces/IIdentity';

export interface ICreateClient {
	credential: ICredential;
	identity: IIdentity;
	contact: IContact;
	address: IAddress;
}
