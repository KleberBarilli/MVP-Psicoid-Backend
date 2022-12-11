import { ICreateContact } from "@modules/newsletter/domain/models/ICreateContact";
import { ICreateUnsub } from "@modules/newsletter/domain/models/ICreateUnsub";
import { INewslettersRepository } from "@modules/newsletter/domain/repositories/INewslettersRepository";
import { contactModel, ContactDocument } from "../entities/Contact";
import { modelUnsub, UnsubDocument } from "../entities/Unsub";

export class NewslettersRepository implements INewslettersRepository {
	contact;
	unsub;
	constructor() {
		this.contact = contactModel;
		this.unsub = modelUnsub;
	}
	async subscribe(email: string): Promise<any> {
		return await this.contact.updateOne({ email }, { subscribed: true });
	}
	async unsubscribe(email: string): Promise<any> {
		return await this.contact.updateOne({ email }, { subscribed: false });
	}
	createContact(contact: ICreateContact): Promise<ContactDocument> {
		return this.contact.create(contact);
	}
	async listAllContacts(): Promise<ContactDocument[]> {
		return await this.contact.find();
	}
	listContactsByTags(tags: string[]): Promise<ContactDocument[]> {
		return this.contact.findByTags(tags);
	}
	async findContactByEmail(email: string): Promise<ContactDocument | null> {
		return await this.contact.findOne({ email });
	}
	createUnsub(data: ICreateUnsub): Promise<UnsubDocument> {
		return this.unsub.create(data);
	}
}
