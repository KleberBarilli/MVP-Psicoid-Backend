import { ContactDocument } from "@modules/newsletter/infra/mongoose/entities/Contact";
import { UnsubDocument } from "@modules/newsletter/infra/mongoose/entities/Unsub";
import { ICreateContact } from "../models/ICreateContact";
import { ICreateUnsub } from "../models/ICreateUnsub";

export interface INewslettersRepository {
	subscribe(email: string): Promise<any>;
	unsubscribe(email: string): Promise<any>;
	createContact(contact: ICreateContact): Promise<ContactDocument>;
	listAllContacts(): Promise<ContactDocument[]>;
	listContactsByTags(tags: string[]): Promise<ContactDocument[]>;
	findContactByEmail(email: string): Promise<ContactDocument | null>;
	createUnsub(data: ICreateUnsub): Promise<UnsubDocument>;
}
