import { NewsletterEmailTemplate } from "@shared/helpers/email-templates/NewsletterEmailTemplate";
import Queue from "@shared/lib/bull/Queue";
import { inject, injectable } from "tsyringe";
import { ICreateContact } from "../domain/models/ICreateContact";
import { INewslettersRepository } from "../domain/repositories/INewslettersRepository";

@injectable()
export class SubscribeContactService {
	constructor(
		@inject("NewslettersRepository")
		private repo: INewslettersRepository,
	) {}
	// private notify(customerId: number, psychologistId: string) {
	// 	return Queue.add("Newsletter Register", {
	// 		type: TypeNotification.NEWUSER,
	// 		data: {
	// 			adminId
	// 			message: NOTIFICATION_MESSAGE.CUSTOMER_ADD_PSICO,
	// 		},
	// 		views: { adminId },
	// 	});
	// }
	private sendEmail(name: string, email: string) {
		return Queue.add("SendMail", {
			recipients: [email],
			subject: "Bem vindo à newsletter PsicoID",
			html: NewsletterEmailTemplate.message(name),
		});
	}

	private async createContact(data: ICreateContact) {
		return this.repo.createContact(data);
	}
	public async execute(data: ICreateContact) {
		const contact = await this.repo.findContactByEmail(data.email);

		if (contact) {
			return this.repo.subscribe(data.email);
		}
		const createContact = await this.createContact(data);

		await this.sendEmail(data.name || "", data.email);

		return createContact;
	}
}
