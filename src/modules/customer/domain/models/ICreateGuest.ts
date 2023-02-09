import { IContact } from "@shared/interfaces/IContact";
import { IPsychologist } from "@shared/interfaces/IPsichologyst";

export interface ICreateGuest {
	name: string;
	contact: IContact;
	psychologists: IPsychologist[];
}
